import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';
import scheduleEmail from '~/mailjet/scheduleEmail';
import { constructRedisKey } from '~/redis/redisUtils';

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
  const initiateCheckoutRedisKey = emailTrackRedisKey(
    userId,
    isMultipleCheckout
      ? MAILJET_TEMPLATE.initiateCheckoutMultipleTimes.name
      : MAILJET_TEMPLATE.initiateCheckoutFirstTime.name,
  );
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
    emailTemplate: isMultipleCheckout
      ? MAILJET_TEMPLATE.initiateCheckoutMultipleTimes.name
      : MAILJET_TEMPLATE.initiateCheckoutFirstTime.name,
    name,
    userId,
  });

  if (result.messageId) {
    await redis.set(initiateCheckoutRedisKey, 'SCHEDULED');
  }
}
