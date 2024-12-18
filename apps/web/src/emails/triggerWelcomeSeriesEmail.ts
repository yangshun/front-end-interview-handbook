import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';

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
    await fetch(`/api/emails/${MAILJET_TEMPLATE.welcomeEmailImmediate.name}`, {
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
