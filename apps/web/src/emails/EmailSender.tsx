import { Resend } from 'resend';

import { EmailPaymentFailed } from './EmailPaymentFailed';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendEmailPaymentFailed(
  email: string,
  name: string | null,
) {
  return await resend.emails.send({
    from: 'GreatFrontEnd <team@greatfrontend.com>',
    react: <EmailPaymentFailed name={name} />,
    subject: `Your payment has failed, here's how you can fix it`,
    to: email,
  });
}
