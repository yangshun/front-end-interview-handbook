import prisma from '~/server/prisma';

import type { ProjectsChallengeSubmissionVote } from '@prisma/client';

const UPVOTE_COUNT_BRACKET = [1, 5, 10, 15, 50, 100, 200, 500];

export async function projectsNotificationForSubmissionVote(
  vote: ProjectsChallengeSubmissionVote,
) {
  const { submissionId } = vote;
  const submission = await prisma.projectsChallengeSubmission.findFirst({
    include: {
      _count: {
        select: {
          votes: true,
        },
      },
    },
    where: {
      id: submissionId,
    },
  });

  if (submission == null) {
    return;
  }

  if (!UPVOTE_COUNT_BRACKET.includes(submission._count.votes)) {
    return;
  }

  await prisma.projectsNotification.create({
    data: {
      category: 'UPVOTE',
      data: {
        count: submission._count.votes,
      },
      profileId: submission.profileId,
      submissionId,
    },
  });
}

export async function projectsNotificationForComment(
  commentId: string,
  entityOwnerId: string,
  entityId: string,
) {
  await prisma.projectsNotification.create({
    data: {
      category: 'DISCUSSION',
      commentId,
      profileId: entityOwnerId,
      submissionId: entityId,
    },
  });
}

export async function projectsNotificationForReply(
  commentId: string,
  projectsProfileId: string,
  entityId: string,
) {
  const comment = await prisma.projectsDiscussionComment.findFirst({
    include: {
      parentComment: true,
    },
    where: {
      id: commentId,
    },
  });

  if (!comment?.parentComment) {
    return;
  }

  // If not self replying
  if (comment.parentComment.profileId !== projectsProfileId) {
    await prisma.projectsNotification.create({
      data: {
        category: 'DISCUSSION',
        commentId,
        profileId: comment.parentComment.profileId,
        submissionId: entityId,
      },
    });
  }
}
