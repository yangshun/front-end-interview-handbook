const welcomeEmailImmediate = 'welcome_email_immediate';

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
    await fetch(`/api/emails/${welcomeEmailImmediate}`, {
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
