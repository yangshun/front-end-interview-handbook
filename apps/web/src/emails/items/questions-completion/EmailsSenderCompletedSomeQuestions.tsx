import { sendReactEmail } from '~/emails/mailjet/EmailsMailjetSender';

import EmailsTemplateCompletedSomeQuestions from './EmailsTemplateCompletedSomeQuestions';
import { emailTrackRedisKey } from '../../EmailsUtils';

import { Redis } from '@upstash/redis';

export default async function sendCompletedSomeQuestionsEmail({
  name,
  email,
  userId,
}: Readonly<{
  email: string;
  name: string;
  userId: string;
}>) {
  const redis = Redis.fromEnv();
  const completedSomeQuestionsEmailRedisKey = emailTrackRedisKey(
    userId,
    'completed_some_questions',
  );

  const completedSomeQuestionsEmailRedisValue = await redis.get(
    completedSomeQuestionsEmailRedisKey,
  );

  if (completedSomeQuestionsEmailRedisValue !== 'SENT') {
    try {
      await sendReactEmail({
        component: <EmailsTemplateCompletedSomeQuestions />,
        from: {
          email: 'hello@greatfrontend.com',
          name: 'GreatFrontEnd',
        },
        subject: "Don't Miss Out: Up to 100% off premium",
        to: {
          email,
          name,
        },
      });
      redis.set(completedSomeQuestionsEmailRedisKey, 'SENT');
    } catch (error) {
      console.error('Error sending email:', error);
      throw error;
    }
  }
}
