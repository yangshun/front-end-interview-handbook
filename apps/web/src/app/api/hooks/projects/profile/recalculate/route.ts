import { type NextRequest, NextResponse } from 'next/server';

import {
  projectsReputationProfileCompleteConfig,
  projectsReputationProfileFieldConfig,
  projectsReputationProfileSignUpConfig,
} from '~/components/projects/reputation/ProjectsReputationPointsConfig';

import prisma from '~/server/prisma';

function createConnectOrCreate({
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

type RequestBody = Readonly<{
  projectsProfileId: string;
}>;

// This route exists to recalculate the points for a projects user whenever
// they update their profile. If they have been awards points for some
// fields and later remove, so be it.
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
    createConnectOrCreate({
      ...projectsReputationProfileSignUpConfig(),
      profileId: projectsProfileId,
    }),
  ];

  let allComplete = true;

  if (
    projectsProfile?.motivations != null &&
    projectsProfile.motivations.length > 0
  ) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('motivation'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (
    projectsProfile?.skillsProficient != null &&
    projectsProfile.skillsProficient.length > 0
  ) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('skills_proficient'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (
    projectsProfile?.skillsToGrow != null &&
    projectsProfile.skillsToGrow.length > 0
  ) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('skills_to_grow'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.bio) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('bio'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.avatarUrl) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('avatar'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.linkedInUsername) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('linkedin'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.githubUsername) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('github'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.website) {
    connectOrCreateItems.push(
      createConnectOrCreate({
        ...projectsReputationProfileFieldConfig('website'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (allComplete) {
    connectOrCreateItems.push(
      createConnectOrCreate({
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
