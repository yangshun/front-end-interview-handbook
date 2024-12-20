export const QUESTIONS_INTEREST_POINT_KEY = 'QUESTIONS_INTEREST_POINT';

export function constructRedisKey(userId: string, action: string) {
  return `${userId}:${action}`;
}
