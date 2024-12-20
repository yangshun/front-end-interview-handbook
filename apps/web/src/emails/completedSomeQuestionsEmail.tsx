import { MAILJET_TEMPLATE } from '~/mailjet/mailjet';
import scheduleEmail from '~/mailjet/scheduleEmail';
import { sendEmail } from '~/mailjet/sendMail';
import {
  constructRedisKey,
  QUESTIONS_INTEREST_POINT_KEY,
} from '~/redis/redisUtils';
import prisma from '~/server/prisma';

import { emailTrackRedisKey } from './emailUtils';
import EmailCompletedSomeQuestions from './templates/EmailCompletedSomeQuestions';

import { render } from '@react-email/components';
import { Redis } from '@upstash/redis';

export async function sendCompletedSomeQuestionsEmail({
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
    MAILJET_TEMPLATE.completedSomeQuestionsEmail.name,
  );

  const completedSomeQuestionsEmailRedisValue = await redis.get(
    completedSomeQuestionsEmailRedisKey,
  );

  if (completedSomeQuestionsEmailRedisValue !== 'SENT') {
    try {
      const [htmlPart, textPart] = await Promise.all([
        render(<EmailCompletedSomeQuestions />),
        render(<EmailCompletedSomeQuestions />, { plainText: true }),
      ]);

      await sendEmail({
        from: {
          email: 'hello@greatfrontend.com',
          name: 'GreatFrontEnd',
        },
        htmlPart,
        subject: "Don't Miss Out: Up to 100% off premium",
        textPart,
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

export async function triggerCompletedSomeQuestionsEmail({
  email,
  userId,
  format,
}: Readonly<{
  email: string;
  format: string;
  userId: string;
}>) {
  const redis = Redis.fromEnv();
  const completedSomeQuestionsEmailRedisKey = emailTrackRedisKey(
    userId,
    MAILJET_TEMPLATE.completedSomeQuestionsEmail.name,
  );
  const completedSomeQuestionsEmailRedisValue = await redis.get(
    completedSomeQuestionsEmailRedisKey,
  );

  if (
    completedSomeQuestionsEmailRedisValue === 'SCHEDULED' ||
    completedSomeQuestionsEmailRedisValue === 'SENT'
  ) {
    return;
  }

  // Interest point for each question format
  const interestPointMap: Record<string, number> = {
    algo: 3,
    article: 1,
    javascript: 3,
    quiz: 1,
    'system-design': 3,
    'user-interface': 3,
  };
  const interestPoint = interestPointMap[format] || 0;

  const questionsInterestPointRedisKey = constructRedisKey(
    userId,
    QUESTIONS_INTEREST_POINT_KEY,
  );
  const questionsInterestPointRedisValue: number = await redis.incrby(
    questionsInterestPointRedisKey,
    interestPoint,
  );
  const TRIGGER_INTEREST_POINT = 15;

  if (questionsInterestPointRedisValue >= TRIGGER_INTEREST_POINT) {
    const profile = await prisma.profile.findUnique({
      select: {
        name: true,
      },
      where: {
        id: userId,
      },
    });
    const result = await scheduleEmail({
      delay: 2,
      email,
      emailTemplate: MAILJET_TEMPLATE.completedSomeQuestionsEmail.name,
      name: profile?.name ?? '',
      userId,
    });

    if (result.messageId) {
      await redis.set(completedSomeQuestionsEmailRedisKey, 'SCHEDULED');
    }
  }
}
