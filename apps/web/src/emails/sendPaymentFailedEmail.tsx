import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';
import { sendEmail } from '~/mailjet/sendMail';

import { emailTrackRedisKey } from './emailUtils';
import EmailPaymentFailed from './templates/EmailPaymentFailed';

import { render } from '@react-email/components';
import { Redis } from '@upstash/redis';

export default async function sendPaymentFailedEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
  userId: string;
}>) {
  const redis = Redis.fromEnv();
  const paymentFailedEmailRedisKey = emailTrackRedisKey(
    userId,
    MAILJET_TEMPLATE.paymentFailed.name,
  );

  const paymentFailedEmailRedisValue = await redis.get(
    paymentFailedEmailRedisKey,
  );

  if (paymentFailedEmailRedisValue === 'SENT') {
    return;
  }
  try {
    const [htmlPart, textPart] = await Promise.all([
      render(<EmailPaymentFailed name={name} />),
      render(<EmailPaymentFailed name={name} />, { plainText: true }),
    ]);

    await sendEmail({
      from: {
        email: 'contact@greatfrontend.com',
        name: 'GreatFrontEnd',
      },
      htmlPart,
      subject: "Your payment has failed, here's how you can fix it",
      textPart,
      to: {
        email,
        name,
      },
    });
    await redis.set(paymentFailedEmailRedisKey, 'SENT', {
      ex: 30 * 24 * 3600, // Expire it 30 days
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
