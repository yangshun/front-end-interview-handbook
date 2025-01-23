import { redirect } from 'next/navigation';
import url from 'node:url';

import prisma from '~/server/prisma';
import type { Viewer } from '~/supabase/SupabaseServerGFE';

export async function redirectToProjectsOnboardingIfProjectsProfileIncomplete(
  viewer: Viewer,
  path: string,
) {
  const viewerProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: viewer.id,
    },
  });

  if (viewerProfile?.projectsProfile?.completed) {
    return viewerProfile;
  }

  return redirect(
    url.format({ pathname: '/projects/onboarding', query: { next: path } }),
  );
}

export async function getOrCreateUserProfileWithProjectsProfile(
  viewer: Viewer,
) {
  const viewerProfile = await prisma.profile.findUniqueOrThrow({
    include: {
      projectsProfile: true,
    },
    where: {
      id: viewer?.id,
    },
  });

  // Logged in with a projects profile. All good
  if (viewerProfile!.projectsProfile) {
    return viewerProfile!;
  }

  // Logged in without a projects profile.
  // Create a projects profile and return it
  await prisma.projectsProfile.upsert({
    create: {
      userId: viewer?.id,
    },
    update: {},
    where: {
      id: viewer?.id,
    },
  });

  return await prisma.profile.findUniqueOrThrow({
    include: {
      projectsProfile: true,
    },
    where: {
      id: viewer?.id,
    },
  });
}
