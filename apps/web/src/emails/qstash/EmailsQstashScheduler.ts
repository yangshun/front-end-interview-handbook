import type { EmailKey } from '~/emails/EmailsTypes';

import { Client } from '@upstash/qstash';

const qstash = new Client({ token: process.env.QSTASH_TOKEN ?? '' });

type Props = Readonly<{
  delayInHours: number; // In hour;
  email: string;
  emailKey: EmailKey;
  name: string | null;
  userId: string;
}>;

export default async function scheduleEmail({
  name,
  email,
  delayInHours,
  userId,
  emailKey,
}: Props) {
  const delayInSeconds = delayInHours * 3600;
  // TODO(email): use getSiteOrigin()
  const endpointOriginURL =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://dev.greatfrontend.com`
      : 'https://www.greatfrontend.com';

  return await qstash.publishJSON({
    body: { email, emailKey, name, userId },
    delay: delayInSeconds,
    url: `${endpointOriginURL}/api/emails/${emailKey}`,
  });
}
