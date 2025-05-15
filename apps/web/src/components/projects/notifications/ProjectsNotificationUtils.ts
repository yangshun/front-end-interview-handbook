import type { ProjectsChallengeSubmissionVote } from '@prisma/client';
import { ProjectsDiscussionCommentDomain } from '@prisma/client';

import { PROJECTS_NOTIFICATION_AVAILABLE } from '~/data/FeatureFlags';

import prisma from '~/server/prisma';

const UPVOTE_COUNT_BRACKET = [1, 5, 10, 15, 50, 100, 200, 500];

export async function projectsNotificationForSubmissionVote(
  vote: ProjectsChallengeSubmissionVote,
) {
  if (!PROJECTS_NOTIFICATION_AVAILABLE) {
    return;
  }

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
  if (!PROJECTS_NOTIFICATION_AVAILABLE) {
    return;
  }

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
  domain: ProjectsDiscussionCommentDomain,
) {
  if (!PROJECTS_NOTIFICATION_AVAILABLE) {
    return;
  }

  const comment = await prisma.projectsDiscussionComment.findFirst({
    include: {
      parentComment: true,
    },
    where: {
      id: commentId,
    },
  });

  if (
    !comment?.parentComment ||
    comment.parentComment.profileId === projectsProfileId
  ) {
    return;
  }

  // If not self replying
  if (domain === ProjectsDiscussionCommentDomain.PROJECTS_CHALLENGE) {
    await prisma.projectsNotification.create({
      data: {
        category: 'DISCUSSION',
        commentId,
        data: {
          challengeId: entityId,
        },
        profileId: comment.parentComment.profileId,
      },
    });
  } else {
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
