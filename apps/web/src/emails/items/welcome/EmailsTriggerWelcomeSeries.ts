import type { EmailKey } from '~/emails/EmailsTypes';

const WELCOME_EMAIL_KEY: EmailKey = 'welcome_email_immediate';

export default async function triggerWelcomeSeriesEmail({
  name,
  email,
  signupViaInterviews,
  userId,
}: Readonly<{
  email: string;
  name: string;
  signupViaInterviews: boolean;
  userId: string;
}>) {
  try {
    await fetch(`/api/emails/${WELCOME_EMAIL_KEY}`, {
      body: JSON.stringify({
        email,
        name,
        signupViaInterviews,
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
