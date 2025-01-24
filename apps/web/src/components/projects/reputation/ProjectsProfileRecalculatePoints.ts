import prisma from '~/server/prisma';

import {
  projectsReputationProfileCompleteConfig,
  projectsReputationProfileFieldOptionalConfig,
  projectsReputationProfileFieldRequiredConfig,
  projectsReputationProfileSignUpConfig,
} from './ProjectsReputationPointsItemCalculator';
import { projectsReputationConnectOrCreateShape } from './ProjectsReputationUtils';

export async function projectsProfileRecalculatePoints(
  projectsProfileId?: string,
) {
  if (!projectsProfileId) {
    return;
  }

  const projectsProfile = await prisma.projectsProfile.findUnique({
    include: {
      userProfile: true,
    },
    where: {
      id: projectsProfileId,
    },
  });

  if (projectsProfile == null) {
    return;
  }

  const connectOrCreateItems = [
    projectsReputationConnectOrCreateShape({
      ...projectsReputationProfileSignUpConfig(),
      profileId: projectsProfileId,
    }),
  ];

  let allRequiredComplete = true;

  if (
    projectsProfile.userProfile.name &&
    projectsProfile.userProfile.title &&
    projectsProfile.motivations?.length > 0
  ) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldRequiredConfig(),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allRequiredComplete = false;
  }

  let allOptionalComplete = true;

  if (
    projectsProfile?.skillsProficient != null &&
    projectsProfile.skillsProficient.length > 0
  ) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('skills_proficient'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (
    projectsProfile?.skillsToGrow != null &&
    projectsProfile.skillsToGrow.length > 0
  ) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('skills_to_grow'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (projectsProfile?.userProfile.bio) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('bio'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (projectsProfile?.userProfile.avatarUrl) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('avatar'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (projectsProfile?.userProfile.linkedInUsername) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('linkedin'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (projectsProfile?.userProfile.githubUsername) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('github'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (projectsProfile?.userProfile.website) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('website'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (projectsProfile?.userProfile.company) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldOptionalConfig('company'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allOptionalComplete = false;
  }

  if (allRequiredComplete && allOptionalComplete) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileCompleteConfig(),
        profileId: projectsProfileId,
      }),
    );
  }

  return await prisma.projectsProfile.update({
    data: {
      reputation: {
        connectOrCreate: connectOrCreateItems,
      },
    },
    where: {
      id: projectsProfileId,
    },
  });
}
