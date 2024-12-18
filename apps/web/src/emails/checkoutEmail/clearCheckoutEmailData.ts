import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';
import { constructRedisKey } from '~/redis/redisUtils';

import { emailTrackRedisKey } from '../emailUtils';

import { Redis } from '@upstash/redis';

type Props = Readonly<{
  userId: string;
}>;

export default async function clearCheckoutEmailData({ userId }: Props) {
  const redis = Redis.fromEnv();
  const initiateCheckoutFirstTimeRedisKey = emailTrackRedisKey(
    userId,
    MAILJET_TEMPLATE.initiateCheckoutFirstTime.name,
  );
  const initiateCheckoutMultipleTimesRedisKey = emailTrackRedisKey(
    userId,
    MAILJET_TEMPLATE.initiateCheckoutMultipleTimes.name,
  );
  const checkoutCountRedisKey = constructRedisKey(userId, 'CHECKOUT_COUNT');

  // Clear all the checkout email redis key
  await Promise.all([
    redis.del(initiateCheckoutFirstTimeRedisKey),
    redis.del(initiateCheckoutMultipleTimesRedisKey),
    redis.del(checkoutCountRedisKey),
  ]);
}
