import { scheduleEmailWithChecks } from '~/emails/qstash/EmailsQstashScheduler';
import RedisCounter from '~/redis/RedisCounter';
import prisma from '~/server/prisma';

const TRIGGER_INTEREST_POINT = 15;

type InterviewsInterestEntity =
  | 'algo'
  | 'article'
  | 'javascript'
  | 'quiz'
  | 'system-design'
  | 'user-interface';

export default async function triggerInterviewsProgressEmail({
  email,
  userId,
  entity,
}: Readonly<{
  email: string;
  entity: InterviewsInterestEntity;
  userId: string;
}>) {
  // Interest point for each question format
  const interestPointMap: Record<InterviewsInterestEntity, number> = {
    algo: 3,
    article: 1,
    javascript: 3,
    quiz: 1,
    'system-design': 3,
    'user-interface': 3,
  };
  const points = interestPointMap[entity] || 0;

  const questionsInterestPointsRedisCounter = new RedisCounter(
    'QUESTIONS_INTEREST_POINT',
    userId,
  );
  const questionsInterestPointRedisValue =
    await questionsInterestPointsRedisCounter.incrby(points);

  if (questionsInterestPointRedisValue < TRIGGER_INTEREST_POINT) {
    return;
  }

  const profile = await prisma.profile.findUnique({
    select: {
      name: true,
      premium: true,
    },
    where: {
      id: userId,
    },
  });

  if (profile == null || profile.premium) {
    return;
  }

  await scheduleEmailWithChecks({
    delayInHours: 2,
    email,
    emailKey: 'INTERVIEWS_PROGRESS',
    name: profile?.name ?? null,
    userId,
  });
}
