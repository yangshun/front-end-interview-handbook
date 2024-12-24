import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetSender';

import EmailsTemplateWelcomeSeriesAfter24Hours from './EmailsTemplateWelcomeSeriesAfter24Hours';
import EmailsTemplateWelcomeSeriesImmediate from './EmailsTemplateWelcomeSeriesImmediate';

export async function sendWelcomeEmailImmediate({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string | null;
  signedUpViaInterviews: boolean;
  userId: string;
}>) {
  await sendReactEmailWithChecks(
    { emailKey: 'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE', userId },
    {
      component: <EmailsTemplateWelcomeSeriesImmediate />,
      from: {
        email: 'hello@greatfrontend.com',
        name: 'GreatFrontEnd',
      },
      subject:
        '🚀 Start Here: Your Simple, Proven Roadmap to Front End Interview Success',
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
      { emailKey: 'INTERVIEWS_WELCOME_EMAIL_24_HOURS', userId },
      {
        component: <EmailsTemplateWelcomeSeriesAfter24Hours />,
        from: {
          email: 'hello@greatfrontend.com',
          name: 'GreatFrontEnd',
        },
        subject:
          '✨ Actual prep strategies by real users to clinch multiple Front End offers',
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
