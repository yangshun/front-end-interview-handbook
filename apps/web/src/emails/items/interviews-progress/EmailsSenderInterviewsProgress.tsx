import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetSender';

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
    await sendReactEmailWithChecks(
      { emailKey: 'INTERVIEWS_PROGRESS', userId },
      {
        component: <EmailsTemplateInterviewsProgress />,
        from: {
          email: 'hello@greatfrontend.com',
          name: 'GreatFrontEnd',
        },
        subject: "Don't Miss Out: Up to 100% off premium",
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
