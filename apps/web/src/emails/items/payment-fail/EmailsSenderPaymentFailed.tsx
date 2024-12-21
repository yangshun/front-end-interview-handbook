import EmailsSendStatus from '~/emails/EmailsSendStatus';
import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetSender';

import EmailsTemplatePaymentFailed from './EmailsTemplatePaymentFailed';

export default async function sendPaymentFailedEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
  userId: string;
}>) {
  const sendStatus = new EmailsSendStatus('PAYMENT_FAILED', userId);

  if (!(await sendStatus.shouldSend())) {
    return;
  }

  try {
    await sendReactEmail({
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
    });

    const THIRTY_DAYS_IN_SECS = 30 * 24 * 3600;

    await sendStatus.markAsSent({
      ex: THIRTY_DAYS_IN_SECS,
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
