import 'server-only';

import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetClient';

import { EmailsItemConfigWelcomeSeriesAfter24Hours } from './EmailsItemConfigWelcomeSeriesAfter24Hours';
import { EmailsItemConfigWelcomeSeriesImmediate } from './EmailsItemConfigWelcomeSeriesImmediate';

export async function sendWelcomeEmailImmediate({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string | null;
  userId: string;
}>) {
  await sendReactEmailWithChecks(
    { emailKey: EmailsItemConfigWelcomeSeriesImmediate.id, userId },
    {
      component: <EmailsItemConfigWelcomeSeriesImmediate.component />,
      from: EmailsItemConfigWelcomeSeriesImmediate.from,
      subject: EmailsItemConfigWelcomeSeriesImmediate.subject({}),
      to: {
        email,
        name,
      },
    },
  );
}

export async function sendWelcomeEmailAfter24Hours({
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
      { emailKey: EmailsItemConfigWelcomeSeriesAfter24Hours.id, userId },
      {
        component: <EmailsItemConfigWelcomeSeriesAfter24Hours.component />,
        from: EmailsItemConfigWelcomeSeriesAfter24Hours.from,
        subject: EmailsItemConfigWelcomeSeriesAfter24Hours.subject({}),
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
