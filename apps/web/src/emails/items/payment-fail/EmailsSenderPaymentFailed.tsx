import 'server-only';

import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetClient';

import { EmailsItemConfigPaymentFailed } from './EmailsItemConfigPaymentFailed';

const THIRTY_DAYS_IN_SECS = 30 * 24 * 3600;

export default async function sendPaymentFailedEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string | null;
  userId: string;
}>) {
  return await sendEmailItemWithChecks(
    {
      email,
      name,
    },
    {
      emailItemConfig: {
        config: EmailsItemConfigPaymentFailed,
        props: { name },
      },
      redis: {
        opts: {
          ex: THIRTY_DAYS_IN_SECS,
        },
      },
      userId,
    },
  );
}
