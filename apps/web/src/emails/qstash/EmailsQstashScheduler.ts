import EmailsSendStatus from '~/emails/EmailsSendStatus';
import type { EmailKey } from '~/emails/EmailsTypes';
import { getSiteOrigin } from '~/seo/siteUrl';

import { Client } from '@upstash/qstash';

const QStash = new Client({ token: process.env.QSTASH_TOKEN ?? '' });

// TODO(emails): refactor to be discriminated union
type Props = Readonly<{
  countryCode?: string | null;
  delayInHours: number;
  email: string;
  emailKey: EmailKey;
  name: string | null;
  userId: string;
}>;

export async function scheduleEmailWithChecks({
  countryCode,
  name,
  email,
  delayInHours,
  userId,
  emailKey,
}: Props) {
  const sendStatus = new EmailsSendStatus(emailKey, userId);

  if (await sendStatus.isScheduledOrSent()) {
    return;
  }

  const result = await scheduleEmail({
    countryCode,
    delayInHours,
    email,
    emailKey,
    name,
    userId,
  });

  if (result.messageId) {
    await sendStatus.markAsScheduled();
  }
}

export async function scheduleEmail({
  countryCode,
  name,
  email,
  delayInHours,
  userId,
  emailKey,
}: Props) {
  const delayInSeconds = delayInHours * 3600;

  return await QStash.publishJSON({
    body: { countryCode, email, emailKey, name, userId },
    delay: delayInSeconds,
    url: `${getSiteOrigin({ usePreviewForDev: true })}/api/emails`,
  });
}
