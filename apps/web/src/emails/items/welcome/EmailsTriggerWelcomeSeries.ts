import type { EmailKey } from '~/emails/EmailsTypes';

const WELCOME_EMAIL_KEY: EmailKey = 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE';

export default async function triggerWelcomeSeriesEmail({
  name,
  email,
  signedUpViaInterviews,
  userId,
}: Readonly<{
  email: string;
  name: string;
  signedUpViaInterviews: boolean;
  userId: string;
}>) {
  try {
    await fetch(`/api/emails/${WELCOME_EMAIL_KEY}`, {
      body: JSON.stringify({
        email,
        name,
        signedUpViaInterviews,
        userId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    });
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
