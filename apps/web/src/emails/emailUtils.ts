import type { EmailKey } from './EmailTypes';

export function emailTrackRedisKey(userId: string, emailKey: EmailKey) {
  return `${userId}:email:track:${emailKey}`;
}
