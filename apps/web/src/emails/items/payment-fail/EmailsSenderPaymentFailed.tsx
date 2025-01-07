import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetUtils';

import { EmailsItemConfigPaymentFailed } from './EmailsItemConfigPaymentFailed';

const THIRTY_DAYS_IN_SECS = 30 * 24 * 3600;

export default async function sendPaymentFailedEmail({
  name,
  email,
  userId,
  product,
}: Readonly<{
  email: string;
  name: string | null;
  product: 'interviews' | 'projects';
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
        props: { name, product },
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
