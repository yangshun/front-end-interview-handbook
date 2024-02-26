import { type NextRequest, NextResponse } from 'next/server';

import prisma from '~/server/prisma';

function createConnectOrCreate(key: string, profileId: string, points: number) {
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
    createConnectOrCreate('projects.profile.sign_up', projectsProfileId, 20),
  ];

  let allComplete = true;

  if (
    projectsProfile?.motivations != null &&
    projectsProfile.motivations.length > 0
  ) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.motivation',
        projectsProfileId,
        100,
      ),
    );
  } else {
    allComplete = false;
  }

  if (
    projectsProfile?.skillsProficient != null &&
    projectsProfile.skillsProficient.length > 0
  ) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.skills_proficient',
        projectsProfileId,
        25,
      ),
    );
  } else {
    allComplete = false;
  }

  if (
    projectsProfile?.skillsToGrow != null &&
    projectsProfile.skillsToGrow.length > 0
  ) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.skills_to_grow',
        projectsProfileId,
        25,
      ),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.bio) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.bio',
        projectsProfileId,
        25,
      ),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.avatarUrl) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.avatar',
        projectsProfileId,
        25,
      ),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.linkedInUsername) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.linkedin',
        projectsProfileId,
        25,
      ),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.githubUsername) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.github',
        projectsProfileId,
        25,
      ),
    );
  } else {
    allComplete = false;
  }

  if (projectsProfile?.userProfile.website) {
    connectOrCreateItems.push(
      createConnectOrCreate(
        'projects.profile.field.website',
        projectsProfileId,
        25,
      ),
    );
  } else {
    allComplete = false;
  }

  if (allComplete) {
    connectOrCreateItems.push(
      createConnectOrCreate('projects.profile.complete', projectsProfileId, 50),
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
