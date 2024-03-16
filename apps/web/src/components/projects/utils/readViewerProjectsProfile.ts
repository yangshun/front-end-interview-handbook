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
  let user = userParam ?? null;

  if (user == null) {
    user = await readViewerFromToken();
  }

  if (user == null) {
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
      userId: user.id,
    },
  });

  return {
    viewerId: user.id,
    viewerProjectsProfile: projectsProfile,
  };
}
