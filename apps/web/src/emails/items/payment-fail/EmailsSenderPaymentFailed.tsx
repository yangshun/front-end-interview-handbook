import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetSender';

import EmailsTemplatePaymentFailed from './EmailsTemplatePaymentFailed';

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
        emailKey: 'PAYMENT_FAILED',
        opts: {
          ex: THIRTY_DAYS_IN_SECS,
        },
        userId,
      },
      {
        component: <EmailsTemplatePaymentFailed name={name} />,
        from: {
          email: 'contact@greatfrontend.com',
          name: 'GreatFrontEnd',
        },
        subject: "Your payment has failed, here's how you can fix it",
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
