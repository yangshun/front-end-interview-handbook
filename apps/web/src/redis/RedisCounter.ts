import { Redis } from '@upstash/redis';

type RedisCounterKey = 'INTERVIEWS_CHECKOUT_COUNT' | 'QUESTIONS_INTEREST_POINT';

export default class RedisCounter {
  redisKey: string;
  redis: Redis;

  constructor(counterKey: RedisCounterKey, userId: string) {
    this.redisKey = `${userId}:count:${counterKey}`;
    this.redis = Redis.fromEnv();
  }

  async incr() {
    return this.redis.incr(this.redisKey);
  }

  async incrby(value: number) {
    return this.redis.incrby(this.redisKey, value);
  }

  async expire(
    seconds: Parameters<typeof this.redis.expire>[1],
    option?: Parameters<typeof this.redis.expire>[2],
  ) {
    return this.redis.expire(this.redisKey, seconds, option);
  }

  async get() {
    return this.redis.get(this.redisKey);
  }

  async del() {
    return this.redis.del(this.redisKey);
  }
}
