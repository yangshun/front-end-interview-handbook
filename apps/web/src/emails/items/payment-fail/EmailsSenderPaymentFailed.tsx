import 'server-only';

import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetClient';

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
  try {
    await sendReactEmailWithChecks(
      {
        emailKey: EmailsItemConfigPaymentFailed.id,
        opts: {
          ex: THIRTY_DAYS_IN_SECS,
        },
        userId,
      },
      {
        component: <EmailsItemConfigPaymentFailed.component name={name} />,
        from: EmailsItemConfigPaymentFailed.from,
        subject: EmailsItemConfigPaymentFailed.subject({ name }),
        to: {
          email,
          name,
        },
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
