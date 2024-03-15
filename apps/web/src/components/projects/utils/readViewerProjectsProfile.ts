import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

import type { ProjectsViewerProjectsProfile } from '../types';

export default async function readViewerProjectsProfile(
  userParam?: Readonly<{
    email: string; // User Email.
    id: string; // User ID.
  }> | null,
): Promise<
  Readonly<{
    userId: string | null;
    viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
  }>
> {
  let user = userParam ?? null;

  if (user == null) {
    user = await readUserFromToken();
  }

  if (user == null) {
    return {
      userId: null,
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
    userId: user.id,
    viewerProjectsProfile: projectsProfile,
  };
}
