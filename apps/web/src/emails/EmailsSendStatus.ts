import type { EmailKey } from './EmailsTypes';

import type { SetCommandOptions } from '@upstash/redis';
import { Redis } from '@upstash/redis';

const SENT = 'SENT';
const SCHEDULED = 'SCHEDULED';

export default class EmailsSendStatus {
  redisKey: string;
  redis: Redis;

  constructor(emailKey: EmailKey, userId: string) {
    this.redisKey = `${userId}:emails:${emailKey}`;
    this.redis = Redis.fromEnv();
  }

  async isSent() {
    const sendStatus = await this.redis.get(this.redisKey);

    return sendStatus === SENT;
  }

  async isScheduledOrSent() {
    const sendStatus = await this.redis.get(this.redisKey);

    return sendStatus === SENT || sendStatus === SCHEDULED;
  }

  async markAsSent(opts?: SetCommandOptions) {
    return this.redis.set(this.redisKey, SENT, opts);
  }

  async markAsScheduled(opts?: SetCommandOptions) {
    return this.redis.set(this.redisKey, SCHEDULED, opts);
  }

  async del() {
    return this.redis.del(this.redisKey);
  }
}
