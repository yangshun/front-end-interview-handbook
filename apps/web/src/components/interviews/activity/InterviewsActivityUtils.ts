import prisma from '~/server/prisma';

export async function interviewsActivityForNewComment({
  actorId,
  commentId,
}: Readonly<{
  actorId: string;
  commentId: string;
}>) {
  await prisma.interviewsActivity.create({
    data: {
      actorId,
      category: 'DISCUSSION',
      commentId,
    },
  });
}

export async function interviewsActivityForReplyingToComment({
  actorId,
  commentId,
}: Readonly<{
  actorId: string;
  commentId: string;
}>) {
  const comment = await prisma.interviewsDiscussionComment.findUnique({
    include: {
      parentComment: {
        select: {
          profileId: true,
        },
      },
      repliedTo: {
        select: {
          profileId: true,
        },
      },
    },
    where: { id: commentId },
  });

  if (!comment) {
    return;
  }

  const activities = [];

  // Add reply activity
  activities.push({
    actorId,
    category: 'DISCUSSION' as const,
    commentId,
    recipientId:
      comment.parentComment?.profileId &&
      actorId !== comment.parentComment.profileId
        ? comment.parentComment.profileId
        : null,
  });

  // Add activity for replying to reply if it exists and recipient is not actor
  if (comment.repliedTo?.profileId && actorId !== comment.repliedTo.profileId) {
    activities.push({
      actorId,
      category: 'DISCUSSION' as const,
      commentId,
      recipientId: comment.repliedTo.profileId,
    });
  }

  // Bulk create activities if any
  if (activities.length > 0) {
    await prisma.interviewsActivity.createMany({
      data: activities,
      skipDuplicates: true,
    });
  }
}

export async function interviewsActivityForUpvotingComment({
  actorId,
  voteId,
}: Readonly<{
  actorId: string;
  voteId: string;
}>) {
  const upvote = await prisma.interviewsDiscussionCommentVote.findUnique({
    include: {
      comment: {
        select: {
          profileId: true,
        },
      },
    },
    where: { id: voteId },
  });

  if (!upvote) {
    return;
  }

  await prisma.interviewsActivity.create({
    data: {
      actorId,
      category: 'DISCUSSION_UPVOTE',
      recipientId:
        actorId !== upvote.comment.profileId ? upvote.comment.profileId : null,
      voteId,
    },
  });
}

function getStartOfCurrWeek(date: Date) {
  const diff = date.getDate() - date.getDay() + (date.getDay() === 0 ? -6 : 1);

  const startOfWeek = new Date(date.setDate(diff));

  startOfWeek.setHours(0, 0, 0, 0);

  return startOfWeek;
}

function getStartOfPrevWeek(date: Date) {
  const startOfPrevWeek = getStartOfCurrWeek(date);

  startOfPrevWeek.setDate(startOfPrevWeek.getDate() - 7);

  return startOfPrevWeek;
}

function getStartOfCurrMonth(date: Date) {
  const startOfCurrMonth = new Date(date.getFullYear(), date.getMonth(), 1);

  startOfCurrMonth.setHours(0, 0, 0, 0);

  return startOfCurrMonth;
}

function getStartOfPrevMonth(date: Date) {
  const startOfPrevMonth = getStartOfCurrMonth(date);

  startOfPrevMonth.setMonth(startOfPrevMonth.getMonth() - 1);

  return startOfPrevMonth;
}

export function categorizeActivitiesByTimeframe<T extends { createdAt: Date }>(
  data: ReadonlyArray<T>,
): Readonly<{
  activitiesInCurrMonth: ReadonlyArray<T>;
  activitiesInCurrWeek: ReadonlyArray<T>;
  activitiesInPrevMonth: ReadonlyArray<T>;
  activitiesInPrevWeek: ReadonlyArray<T>;
  activitiesOlderThanPrevMonth: ReadonlyArray<T>;
}> {
  const indexOfFirstActivityOlderThanCurrWeek = data.findIndex((activity) => {
    const startOfCurrWeek = getStartOfCurrWeek(new Date());

    return activity.createdAt.getTime() < startOfCurrWeek.getTime();
  });

  const indexOfFirstActivityOlderThanPrevWeek = data.findIndex((activity) => {
    const startOfPrevWeek = getStartOfPrevWeek(new Date());

    return activity.createdAt.getTime() < startOfPrevWeek.getTime();
  });
  const indexOfFirstActivityOlderThanCurrMonth = data.findIndex((activity) => {
    const startOfCurrMonth = getStartOfCurrMonth(new Date());

    return activity.createdAt.getTime() < startOfCurrMonth.getTime();
  });
  const indexOfFirstActivityOlderThanPrevMonth = data.findIndex((activity) => {
    const startOfPrevMonth = getStartOfPrevMonth(new Date());

    return activity.createdAt.getTime() < startOfPrevMonth.getTime();
  });

  const activitiesInCurrWeek = data.slice(
    0,
    indexOfFirstActivityOlderThanCurrWeek === -1
      ? undefined
      : indexOfFirstActivityOlderThanCurrWeek,
  );
  const activitiesInPrevWeek =
    indexOfFirstActivityOlderThanCurrWeek === -1
      ? []
      : data.slice(
          indexOfFirstActivityOlderThanCurrWeek,
          indexOfFirstActivityOlderThanPrevWeek === -1
            ? undefined
            : indexOfFirstActivityOlderThanPrevWeek,
        );
  const activitiesInCurrMonth =
    indexOfFirstActivityOlderThanPrevWeek === -1
      ? []
      : data.slice(
          indexOfFirstActivityOlderThanPrevWeek,
          indexOfFirstActivityOlderThanCurrMonth === -1
            ? undefined
            : indexOfFirstActivityOlderThanCurrMonth,
        );
  const activitiesInPrevMonth =
    indexOfFirstActivityOlderThanCurrMonth === -1
      ? []
      : data.slice(
          indexOfFirstActivityOlderThanCurrMonth,
          indexOfFirstActivityOlderThanPrevMonth === -1
            ? undefined
            : indexOfFirstActivityOlderThanPrevMonth,
        );
  const activitiesOlderThanPrevMonth =
    indexOfFirstActivityOlderThanPrevMonth === -1
      ? []
      : data.slice(indexOfFirstActivityOlderThanPrevMonth);

  return {
    activitiesInCurrMonth,
    activitiesInCurrWeek,
    activitiesInPrevMonth,
    activitiesInPrevWeek,
    activitiesOlderThanPrevMonth,
  };
}
