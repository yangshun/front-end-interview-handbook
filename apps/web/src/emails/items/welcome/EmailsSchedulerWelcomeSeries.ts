import 'server-only';

import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';

const ONE_MIN_SECS = 60;
const ONE_DAY_SECS = 24 * 60 * 60;

export default async function scheduleWelcomeSeriesEmail({
  userId,
}: Readonly<{
  userId: string;
}>) {
  await Promise.all([
    scheduleEmailWithChecks({
      delayInSeconds: ONE_MIN_SECS,
      emailKey: 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE',
      userId,
    }),
    scheduleEmailWithChecks({
      delayInSeconds: ONE_DAY_SECS,
      emailKey: 'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
      userId,
    }),
  ]);
}
