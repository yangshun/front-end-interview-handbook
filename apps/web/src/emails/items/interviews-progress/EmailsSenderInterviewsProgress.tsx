import 'server-only';

import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetClient';
import prisma from '~/server/prisma';

import { EmailsItemConfigInterviewsProgress } from './EmailsItemConfigInterviewsProgress';

export async function sendInterviewsProgressEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string | null;
  userId: string;
}>) {
  try {
    const profile = await prisma.profile.findUnique({
      select: {
        premium: true,
      },
      where: {
        id: userId,
      },
    });

    if (profile?.premium) {
      return;
    }

    await sendReactEmailWithChecks(
      {
        emailItemConfig: EmailsItemConfigInterviewsProgress,
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
