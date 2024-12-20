import scheduleEmail from '~/mailjet/scheduleEmail';
import { constructRedisKey } from '~/redis/RedisUtils';

import { emailTrackRedisKey } from '../emailUtils';

import { Redis } from '@upstash/redis';

const MULTIPLE_CHECKOUT_COUNT = 3;
const EXPIRES_MONTH = 6;

function secondsFromTodayToSixMonths() {
  const today = new Date();
  const sixMonthsLater = new Date();

  sixMonthsLater.setMonth(today.getMonth() + EXPIRES_MONTH);

  const timeDifference = sixMonthsLater.getTime() - today.getTime();
  const secondsDifference = timeDifference / 1000;

  return Math.round(secondsDifference);
}

export default async function triggerInitiateCheckoutEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
  userId: string;
}>) {
  const sixMonthsInSec = secondsFromTodayToSixMonths();

  const redis = Redis.fromEnv();
  const checkoutCountRedisKey = constructRedisKey(userId, 'CHECKOUT_COUNT');
  const checkoutCountRedisValue = await redis.incr(checkoutCountRedisKey);

  if (checkoutCountRedisValue === 1) {
    redis.expire(checkoutCountRedisKey, sixMonthsInSec);
  }

  const isMultipleCheckout = checkoutCountRedisValue >= MULTIPLE_CHECKOUT_COUNT;
  const emailKey = isMultipleCheckout
    ? 'checkout_multiples_times'
    : 'checkout_first_time';
  const initiateCheckoutRedisKey = emailTrackRedisKey(userId, emailKey);
  const initiateCheckoutRedisValue = await redis.get(initiateCheckoutRedisKey);

  if (
    initiateCheckoutRedisValue === 'SCHEDULED' ||
    initiateCheckoutRedisValue === 'SENT'
  ) {
    return;
  }

  if (
    checkoutCountRedisValue !== 1 &&
    checkoutCountRedisValue !== MULTIPLE_CHECKOUT_COUNT
  ) {
    return;
  }

  const result = await scheduleEmail({
    delay: 24,
    email,
    emailTemplate: emailKey,
    name,
    userId,
  });

  if (result.messageId) {
    await redis.set(initiateCheckoutRedisKey, 'SCHEDULED');
  }
}
