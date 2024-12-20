import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetSender';
import scheduleEmail from '~/emails/qstash/EmailsQstashScheduler';

import EmailsTemplateWelcomeSeriesAfter24Hours from './EmailsTemplateWelcomeSeriesAfter24Hours';
import EmailsTemplateWelcomeSeriesImmediate from './EmailsTemplateWelcomeSeriesImmediate';
import { emailTrackRedisKey } from '../../EmailsUtils';

import { Redis } from '@upstash/redis';

export async function sendWelcomeEmailImmediate({
  name,
  email,
  userId,
  signupViaInterviews,
}: Readonly<{
  email: string;
  name: string;
  signupViaInterviews: boolean;
  userId: string;
}>) {
  const redis = Redis.fromEnv();
  const welcomeEmailImmediateRedisKey = emailTrackRedisKey(
    userId,
    'welcome_email_immediate',
  );
  const welcomeEmailAfter24HoursRedisKey = emailTrackRedisKey(
    userId,
    'welcome_email_after_24_hours',
  );

  const welcomeEmailImmediateRedisValue = await redis.get(
    welcomeEmailImmediateRedisKey,
  );

  if (welcomeEmailImmediateRedisValue !== 'SENT') {
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
      await redis.set(welcomeEmailImmediateRedisKey, 'SENT');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }

  if (!signupViaInterviews) {
    // This email is only sent out for interviews signup
    // But if the user signup via projects, store as SENT for that case as well without sending the email
    // because we rely on this Redis value to sent out the email and we don't want to retrigger this email again
    await redis.set(welcomeEmailAfter24HoursRedisKey, 'SENT');

    return;
  }

  // Schedule welcome email to be sent out after 24 hours
  const welcomeEmailAfter24HoursRedisValue = await redis.get(
    welcomeEmailAfter24HoursRedisKey,
  );

  if (
    welcomeEmailAfter24HoursRedisValue !== 'SCHEDULED' &&
    welcomeEmailAfter24HoursRedisValue !== 'SENT'
  ) {
    const result = await scheduleEmail({
      delay: 24,
      email,
      emailTemplate: 'welcome_email_after_24_hours',
      name,
      userId,
    });

    if (result.messageId) {
      await redis.set(welcomeEmailAfter24HoursRedisKey, 'SCHEDULED');
    }
  }
}

export async function sendWelcomeEmailAfter24Hours({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
  userId: string;
}>) {
  const redis = Redis.fromEnv();
  const welcomeEmailAfter24HoursRedisKey = emailTrackRedisKey(
    userId,
    'welcome_email_after_24_hours',
  );

  const welcomeEmailAfter24HoursRedisValue = await redis.get(
    welcomeEmailAfter24HoursRedisKey,
  );

  if (welcomeEmailAfter24HoursRedisValue !== 'SENT') {
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
      redis.set(welcomeEmailAfter24HoursRedisKey, 'SENT');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
