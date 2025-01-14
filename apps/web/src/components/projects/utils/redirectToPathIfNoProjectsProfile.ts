import 'server-only';

import { redirect } from 'next/navigation';

import prisma from '~/server/prisma';
import type { Viewer } from '~/supabase/SupabaseServerGFE';

export async function redirectToPathIfNoProjectsProfile(
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

  if (viewerProfile?.projectsProfile != null) {
    return viewerProfile;
  }

  return redirect(path);
}

export async function redirectToProjectsOnboardingIfNoProjectsProfile(
  viewer: Viewer,
) {
  return redirectToPathIfNoProjectsProfile(viewer, '/projects/onboarding');
}
