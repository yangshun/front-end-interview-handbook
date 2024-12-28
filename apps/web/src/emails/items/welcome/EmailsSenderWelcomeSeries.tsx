import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetUtils';

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
  return await sendEmailItemWithChecks(
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
  return await sendEmailItemWithChecks(
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
}
