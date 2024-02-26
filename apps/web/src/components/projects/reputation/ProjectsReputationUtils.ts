import prisma from '~/server/prisma';

import {
  projectsReputationDiscussionsCommentConfig,
  projectsReputationDiscussionsCommentVoteConfig,
  projectsReputationSubmissionVoteConfig,
} from './ProjectsReputationPointsConfig';

import type {
  DiscussionCommentVote,
  ProjectsChallengeSubmissionVote,
} from '@prisma/client';
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
            create: projectsReputationDiscussionsCommentConfig(comment.id),
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
      key: projectsReputationDiscussionsCommentConfig(deletedComment.id).key,
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
            create: projectsReputationDiscussionsCommentVoteConfig(vote.id),
          },
        },
      },
    },
    where: {
      id: comment.userId,
    },
  });
}

export async function projectsReputationCommentVoteRevokePoints(
  deletedVote: DiscussionCommentVote,
) {
  await prisma.projectsReputationPoint.deleteMany({
    where: {
      key: projectsReputationDiscussionsCommentVoteConfig(deletedVote.id).key,
    },
  });
}

export async function projectsReputationSubmissionVoteAwardPoints(
  vote: ProjectsChallengeSubmissionVote,
) {
  const { submissionId, profileId: voterId } = vote;
  const submission = await prisma.projectsChallengeSubmission.findFirst({
    where: {
      id: submissionId,
    },
  });

  if (
    submission == null ||
    voterId === submission.profileId // Don't give points for self-votes.
  ) {
    return;
  }

  await prisma.projectsProfile.update({
    data: {
      reputation: {
        create: projectsReputationSubmissionVoteConfig(vote.id),
      },
    },
    where: {
      id: submission.profileId,
    },
  });
}

export async function projectsReputationSubmissionVoteRevokePoints(
  deletedVote: ProjectsChallengeSubmissionVote,
) {
  await prisma.projectsReputationPoint.deleteMany({
    where: {
      key: projectsReputationSubmissionVoteConfig(deletedVote.id).key,
    },
  });
}
