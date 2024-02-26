import prisma from '~/server/prisma';

import type { DiscussionCommentVote } from '@prisma/client';
import {
  type DiscussionComment,
  DiscussionCommentDomain,
} from '@prisma/client';

export function projectsReputationCommentIsProjectsDomain({
  domain,
}: DiscussionComment) {
  return (
    domain === DiscussionCommentDomain.PROJECTS_SUBMISSION ||
    domain === DiscussionCommentDomain.PROJECTS_CHALLENGE
  );
}

export async function projectsReputationCommentAwardPoints(
  comment: DiscussionComment,
  userId: string,
) {
  if (!projectsReputationCommentIsProjectsDomain(comment)) {
    return;
  }

  await prisma.profile.update({
    data: {
      projectsProfile: {
        update: {
          reputation: {
            create: {
              key: `profile.discussions.comment.${comment.id}`,
              points: 20,
            },
          },
        },
      },
    },
    where: {
      id: userId,
    },
  });
}

export async function projectsReputationCommentRevokePoints(
  deletedComment: DiscussionComment,
) {
  if (!projectsReputationCommentIsProjectsDomain(deletedComment)) {
    return;
  }

  await prisma.projectsReputationPoint.deleteMany({
    where: {
      key: `profile.discussions.comment.${deletedComment.id}`,
    },
  });
}

export async function projectsReputationCommentVoteAwardPoints(
  vote: DiscussionCommentVote,
) {
  const { commentId, userId: voterId } = vote;
  const comment = await prisma.discussionComment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (
    comment == null ||
    !projectsReputationCommentIsProjectsDomain(comment) ||
    voterId === comment.userId // Don't give points for self-votes.
  ) {
    return;
  }

  await prisma.profile.update({
    data: {
      projectsProfile: {
        update: {
          reputation: {
            create: {
              key: `profile.discussions.comment.${commentId}.vote.${vote.id}.${voterId}`,
              points: 10,
            },
          },
        },
      },
    },
    where: {
      id: comment.userId,
    },
  });
}
