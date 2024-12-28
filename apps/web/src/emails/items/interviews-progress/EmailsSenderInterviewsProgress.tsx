import { sendEmailItemWithChecks } from '~/emails/mailjet/EmailsMailjetClient';
import prisma from '~/server/prisma';
import { getErrorMessage } from '~/utils/getErrorMessage';

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
      return { reason: 'PREMIUM_USER', sent: false };
    }

    return await sendEmailItemWithChecks(
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
    return { error: getErrorMessage(error), reason: 'ERROR', sent: false };
  }
}
