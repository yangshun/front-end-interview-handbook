import EmailsSendStatus from '~/emails/EmailsSendStatus';
import scheduleEmail from '~/emails/qstash/EmailsQstashScheduler';
import RedisCounter from '~/redis/RedisCounter';
import prisma from '~/server/prisma';

const TRIGGER_INTEREST_POINT = 15;

export default async function triggerCompletedSomeQuestionsEmail({
  email,
  userId,
  format,
}: Readonly<{
  email: string;
  format: string;
  userId: string;
}>) {
  const sendStatus = new EmailsSendStatus(
    'INTERVIEWS_COMPLETED_SOME_QUESTIONS',
    userId,
  );

  if (await sendStatus.isScheduledOrSent()) {
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
  const points = interestPointMap[format] || 0;

  const questionsInterestPointsRedisCounter = new RedisCounter(
    'QUESTIONS_INTEREST_POINT',
    userId,
  );
  const questionsInterestPointRedisValue =
    await questionsInterestPointsRedisCounter.incrby(points);

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
      delayInHours: 2,
      email,
      emailKey: 'INTERVIEWS_COMPLETED_SOME_QUESTIONS',
      name: profile?.name ?? '',
      userId,
    });

    if (result.messageId) {
      await sendStatus.markAsScheduled();
    }
  }
}
