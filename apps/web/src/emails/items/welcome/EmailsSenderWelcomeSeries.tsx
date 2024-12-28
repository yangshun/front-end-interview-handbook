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
    {
      emailItemConfig: EmailsItemConfigWelcomeSeriesImmediate,
      emailItemConfigProps: {},
      userId,
    },
    {
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
      {
        emailItemConfig: EmailsItemConfigWelcomeSeriesAfter24Hours,
        emailItemConfigProps: {},
        userId,
      },
      {
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
