export function emailTrackRedisKey(userId: string, emailTemplateName: string) {
  return `${userId}:email-track:${emailTemplateName}`;
}
