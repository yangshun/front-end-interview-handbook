import 'server-only';

import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetClient';

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
  await sendEmailItemWithChecks(
    {
      email,
      name,
    },
    {
      emailItemConfig: {
        config: EmailsItemConfigWelcomeSeriesImmediate,
        props: {},
      },
      userId,
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
    await sendEmailItemWithChecks(
      {
        email,
        name,
      },
      {
        emailItemConfig: {
          config: EmailsItemConfigWelcomeSeriesAfter24Hours,
          props: {},
        },
        userId,
      },
    );
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
