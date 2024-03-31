import { type NextRequest, NextResponse } from 'next/server';

import {
  projectsReputationProfileCompleteConfig,
  projectsReputationProfileFieldConfig,
  projectsReputationProfileSignUpConfig,
} from '~/components/projects/reputation/ProjectsReputationPointsConfig';
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

  let allComplete = true;

  if (
    projectsProfile?.motivations != null &&
    projectsProfile.motivations.length > 0
  ) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
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
      projectsReputationConnectOrCreateShape({
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
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldConfig('skills_to_grow'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.bio) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldConfig('bio'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.avatarUrl) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldConfig('avatar'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.linkedInUsername) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldConfig('linkedin'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.githubUsername) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldConfig('github'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.website) {
    connectOrCreateItems.push(
      projectsReputationConnectOrCreateShape({
        ...projectsReputationProfileFieldConfig('website'),
        profileId: projectsProfileId,
      }),
    );
  } else {
    allComplete = false;
  }

  if (allComplete) {
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
