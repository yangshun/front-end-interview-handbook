import EmailsSendStatus from '~/emails/EmailsSendStatus';
import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetSender';
import scheduleEmail from '~/emails/qstash/EmailsQstashScheduler';

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
  const sendStatusImmediate = new EmailsSendStatus(
    'INTERVIEWS_WELCOME_EMAIL_IMMEDIATE',
    userId,
  );

  if (!(await sendStatusImmediate.isSentOrScheduled())) {
    try {
      await sendReactEmail({
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
      });

      await sendStatusImmediate.markAsSent();
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  const sendStatus24Hours = new EmailsSendStatus(
    'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
    userId,
  );

  if (!signedUpViaInterviews) {
    // This email is only sent out for interviews signups but
    // if the user signed up via projects, mark as sent because
    // we rely on this Redis value to send out the email and
    // we don't want to retrigger this email again
    await sendStatus24Hours.markAsSent();

    return;
  }

  if (await sendStatus24Hours.isSentOrScheduled()) {
    return;
  }

  try {
    // Schedule welcome email to be sent out after 24 hours
    const result = await scheduleEmail({
      delayInHours: 24,
      email,
      emailKey: 'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
      name,
      userId,
    });

    if (result.messageId) {
      await sendStatus24Hours.markAsScheduled();
    }
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
  const sendStatus = new EmailsSendStatus(
    'INTERVIEWS_WELCOME_EMAIL_24_HOURS',
    userId,
  );

  if (await sendStatus.isSentOrScheduled()) {
    return;
  }

  try {
    await sendReactEmail({
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
    });

    await sendStatus.markAsSent();
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
}
