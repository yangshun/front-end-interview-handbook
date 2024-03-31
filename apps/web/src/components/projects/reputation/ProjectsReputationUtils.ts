import { sumBy } from 'lodash-es';

import prisma from '~/server/prisma';

import {
  projectsReputationDiscussionsCommentConfig,
  projectsReputationDiscussionsCommentVoteConfig,
  projectsReputationSubmissionDifficultyConfig,
  projectsReputationSubmissionRoadmapSkillConfig,
  projectsReputationSubmissionTechStackConfig,
  projectsReputationSubmissionVoteConfig,
} from './ProjectsReputationPointsConfig';

import type {
  ProjectsChallengeSubmissionVote,
  ProjectsDiscussionCommentVote,
} from '@prisma/client';
import { type ProjectsDiscussionComment } from '@prisma/client';

export function projectsReputationConnectOrCreateShape({
  key: key,
  profileId: profileId,
  points: points,
}: Readonly<{ key: string; points: number; profileId: string }>) {
  return {
    create: {
      key,
      points,
    },
    where: {
      profileId_key: {
        key,
        profileId,
      },
    },
  };
}

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

export async function projectsReputationSubmissionAwardPoints(
  submission: Readonly<{
    profileId: string;
    roadmapSkills: ReadonlyArray<string>;
    slug: string;
    techStackSkills: ReadonlyArray<string>;
  }>,
) {
  const {
    slug,
    profileId: projectsProfileId,
    roadmapSkills,
    techStackSkills,
  } = submission;

  const difficultyPointsConfig =
    await projectsReputationSubmissionDifficultyConfig(slug);
  const connectOrCreateItems = [
    projectsReputationConnectOrCreateShape({
      ...difficultyPointsConfig,
      profileId: projectsProfileId,
    }),
  ];

  const roadmapSkillsRepRecords = await Promise.all(
    roadmapSkills.map((skill) =>
      projectsReputationSubmissionRoadmapSkillConfig(slug, skill),
    ),
  );

  // Sort by descending.
  roadmapSkillsRepRecords.sort((a, b) => b.points - a.points);
  // Take the first 4.
  connectOrCreateItems.push(
    ...roadmapSkillsRepRecords.slice(0, 4).map((config) =>
      projectsReputationConnectOrCreateShape({
        ...config,
        profileId: projectsProfileId,
      }),
    ),
  );

  const techStackRepRecords = techStackSkills.map((techStackSkill) =>
    projectsReputationConnectOrCreateShape({
      ...projectsReputationSubmissionTechStackConfig(slug, techStackSkill),
      profileId: projectsProfileId,
    }),
  );

  connectOrCreateItems.push(...techStackRepRecords);

  const totalPoints = sumBy(connectOrCreateItems, (item) => item.create.points);

  await prisma.projectsProfile.update({
    data: {
      reputation: {
        connectOrCreate: connectOrCreateItems,
      },
    },
    where: {
      id: projectsProfileId,
    },
  });

  return totalPoints;
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
