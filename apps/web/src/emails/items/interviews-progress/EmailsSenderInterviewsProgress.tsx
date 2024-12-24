import 'server-only';

import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetSender';
import prisma from '~/server/prisma';

import EmailsTemplateInterviewsProgress from './EmailsTemplateInterviewsProgress';

export default async function sendInterviewsProgressEmail({
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
      { emailKey: 'INTERVIEWS_PROGRESS', userId },
      {
        component: <EmailsTemplateInterviewsProgress />,
        from: {
          email: 'hello@greatfrontend.com',
          name: 'GreatFrontEnd',
        },
        subject: "Don't miss out: Up to 100% off premium",
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
