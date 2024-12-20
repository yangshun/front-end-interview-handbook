import type { EmailKey } from '~/emails/EmailTypes';

import { Client } from '@upstash/qstash';

const qstash = new Client({ token: process.env.QSTASH_TOKEN ?? '' });

type Props = Readonly<{
  delay: number; // In hour;
  email: string;
  emailTemplate: EmailKey;
  name: string | null;
  userId: string;
}>;

export default async function scheduleEmail({
  name,
  email,
  delay,
  userId,
  emailTemplate,
}: Props) {
  const time = delay * 3600;
  const endpointOriginURL =
    process.env.NEXT_PUBLIC_VERCEL_ENV === 'preview'
      ? `https://dev.greatfrontend.com`
      : 'https://www.greatfrontend.com';

  return await qstash.publishJSON({
    body: { email, emailTemplate, name, userId },
    delay: time,
    url: `${endpointOriginURL}/api/emails/${emailTemplate}`,
  });
}
