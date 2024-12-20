import { constructRedisKey } from '~/redis/RedisUtils';

import { emailTrackRedisKey } from '../../emailUtils';

import { Redis } from '@upstash/redis';

type Props = Readonly<{
  userId: string;
}>;

export default async function clearCheckoutEmailData({ userId }: Props) {
  const redis = Redis.fromEnv();
  const initiateCheckoutFirstTimeRedisKey = emailTrackRedisKey(
    userId,
    'checkout_first_time',
  );
  const initiateCheckoutMultipleTimesRedisKey = emailTrackRedisKey(
    userId,
    'checkout_multiples_times',
  );
  const checkoutCountRedisKey = constructRedisKey(userId, 'CHECKOUT_COUNT');

  // Clear all the checkout email redis key
  await Promise.all([
    redis.del(initiateCheckoutFirstTimeRedisKey),
    redis.del(initiateCheckoutMultipleTimesRedisKey),
    redis.del(checkoutCountRedisKey),
  ]);
}
