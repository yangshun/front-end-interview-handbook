import prisma from '~/server/prisma';

import {
  projectsReputationDiscussionsCommentConfig,
  projectsReputationDiscussionsCommentVoteConfig,
  projectsReputationSubmissionVoteConfig,
} from './ProjectsReputationPointsConfig';

import type {
  ProjectsChallengeSubmissionVote,
  ProjectsDiscussionCommentVote,
} from '@prisma/client';
import { type ProjectsDiscussionComment } from '@prisma/client';

export async function projectsReputationCommentAwardPoints(
  comment: ProjectsDiscussionComment,
  projectsProfileId: string,
) {
  await prisma.projectsProfile.update({
    data: {
      reputation: {
        create: projectsReputationDiscussionsCommentConfig(comment.id),
      },
    },
    where: {
      id: projectsProfileId,
    },
  });
}

export async function projectsReputationCommentRevokePoints(
  deletedComment: ProjectsDiscussionComment,
) {
  await prisma.projectsReputationPoint.deleteMany({
    where: {
      key: projectsReputationDiscussionsCommentConfig(deletedComment.id).key,
    },
  });
}

export async function projectsReputationCommentVoteAwardPoints(
  vote: ProjectsDiscussionCommentVote,
) {
  const { commentId, profileId: voterId } = vote;
  const comment = await prisma.projectsDiscussionComment.findFirst({
    where: {
      id: commentId,
    },
  });

  if (
    comment == null ||
    voterId === comment.profileId // Don't give points for self-votes.
  ) {
    return;
  }

  await prisma.projectsProfile.update({
    data: {
      reputation: {
        create: projectsReputationDiscussionsCommentVoteConfig(vote.id),
      },
    },
    where: {
      id: comment.profileId,
    },
  });
}

export async function projectsReputationCommentVoteRevokePoints(
  deletedVote: ProjectsDiscussionCommentVote,
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
