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
