import { type NextRequest, NextResponse } from 'next/server';

import {
  projectsReputationProfileCompleteConfig,
  projectsReputationProfileFieldOptionalConfig,
  projectsReputationProfileFieldRequiredConfig,
  projectsReputationProfileSignUpConfig,
} from '~/components/projects/reputation/ProjectsReputationPointsItemCalculator';
import { projectsReputationConnectOrCreateShape } from '~/components/projects/reputation/ProjectsReputationUtils';

import prisma from '~/server/prisma';

type RequestBody = Readonly<{
  projectsProfileId: string;
}>;

// This route exists to recalculate the points for a projects user whenever
// they update their profile. If they have been awarded points for some
// fields and later remove those fields, it's fine.
export async function POST(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  if (searchParams.get('api_route_secret') !== process.env.API_ROUTE_SECRET) {
    return NextResponse.json(
      { error: 'You are not authorized to call this API' },
      { status: 401 },
    );
  }

  const result: RequestBody = await req.json();
  const { projectsProfileId } = result;

  const projectsProfile = await prisma.projectsProfile.findUnique({
    include: {
      userProfile: true,
    },
    where: {
      id: projectsProfileId,
    },
  });

  if (projectsProfile == null) {
    return NextResponse.json(
      `No projects profile found for ${projectsProfileId}`,
    );
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
    projectsProfile.userProfile.currentStatus &&
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

  const results = await prisma.projectsProfile.update({
    data: {
      reputation: {
        connectOrCreate: connectOrCreateItems,
      },
    },
    where: {
      id: projectsProfileId,
    },
  });

  return NextResponse.json(results);
}
