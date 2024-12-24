import url from 'node:url';

import EmailsSendStatus from '~/emails/EmailsSendStatus';
import type { EmailKey } from '~/emails/EmailsTypes';
import { getSiteOrigin } from '~/seo/siteUrl';

import { Client } from '@upstash/qstash';

const QStash = new Client({ token: process.env.QSTASH_TOKEN ?? '' });

// TODO(emails): refactor to be discriminated union
type Props = Readonly<{
  countryCode?: string | null;
  delayInSeconds: number;
  email: string;
  emailKey: EmailKey;
  name: string | null;
  userId: string;
}>;

export async function scheduleEmailWithChecks({
  countryCode,
  name,
  email,
  delayInSeconds,
  userId,
  emailKey,
}: Props) {
  const sendStatus = new EmailsSendStatus(emailKey, userId);

  if (await sendStatus.isScheduledOrSent()) {
    return;
  }

  const result = await scheduleEmail({
    countryCode,
    delayInSeconds,
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
  delayInSeconds,
  userId,
  emailKey,
}: Props) {
  return await QStash.publishJSON({
    body: { countryCode, email, emailKey, name, userId },
    delay: delayInSeconds,
    method: 'POST',
    url: url.format({
      host: getSiteOrigin({ usePreviewForDev: true }),
      pathname: '/api/emails__',
      query: {
        api_route_secret: process.env.API_ROUTE_SECRET,
        'x-vercel-protection-bypass':
          process.env.VERCEL_AUTOMATION_BYPASS_SECRET,
      },
    }),
  });
}
