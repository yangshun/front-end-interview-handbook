import 'server-only';

import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetClient';
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

    await sendEmailItemWithChecks(
      {
        email,
        name,
      },
      {
        emailItemConfig: {
          config: EmailsItemConfigInterviewsProgress,
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
