import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

import type { ProjectsViewerProjectsProfile } from '../types';

export default async function readViewerProjectsProfile(
  userParam?: Readonly<{
    email: string; // User Email.
    id: string; // User ID.
  }> | null,
): Promise<
  Readonly<{
    viewerId: string | null;
    viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
  }>
> {
  let viewer = userParam ?? null;

  if (viewer == null) {
    viewer = await readViewerFromToken();
  }

  if (viewer == null) {
    return {
      viewerId: null,
      viewerProjectsProfile: null,
    };
  }

  const projectsProfile = await prisma.projectsProfile.findFirst({
    select: {
      credits: true,
      id: true,
      plan: true,
      premium: true,
    },
    where: {
      userId: viewer.id,
    },
  });

  return {
    viewerId: viewer.id,
    viewerProjectsProfile: projectsProfile,
  };
}
