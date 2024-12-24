import EmailsSendStatus from '~/emails/EmailsSendStatus';
import { sendReactEmailWithChecks } from '~/emails/mailjet/EmailsMailjetSender';
import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';

import EmailsTemplateWelcomeSeriesAfter24Hours from './EmailsTemplateWelcomeSeriesAfter24Hours';
import EmailsTemplateWelcomeSeriesImmediate from './EmailsTemplateWelcomeSeriesImmediate';

export async function sendWelcomeEmailImmediate({
  name,
  email,
  userId,
  signedUpViaInterviews,
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

  if (!signedUpViaInterviews) {
    const sendStatus24Hours = new EmailsSendStatus(
      'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
      userId,
    );

    // This email is only sent out for interviews signups but
    // if the user signed up via projects, mark as sent because
    // we rely on this Redis value to send out the email and
    // we don't want to retrigger this email again
    await sendStatus24Hours.markAsSent();

    return;
  }

  try {
    // Schedule welcome email to be sent out after 24 hours
    await scheduleEmailWithChecks({
      delayInHours: 24,
      email,
      emailKey: 'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
      name,
      userId,
    });
  } catch (error) {
    console.error('Error scheduling email:', error);
    throw error;
  }
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
