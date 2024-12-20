import type { EmailKey } from './EmailsTypes';

export function emailTrackRedisKey(userId: string, emailKey: EmailKey) {
  return `${userId}:email:track:${emailKey}`;
}
