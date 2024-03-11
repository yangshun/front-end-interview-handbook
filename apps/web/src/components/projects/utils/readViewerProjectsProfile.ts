import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

export default async function readViewerProjectsProfile(
  userParam?: Readonly<{
    email: string; // User Email.
    id: string; // User ID.
  }>,
) {
  let user = userParam ?? null;

  if (user == null) {
    user = await readUserFromToken();
  }

  if (user == null) {
    return { isViewerPremium: false, projectsProfileId: null, userId: null };
  }

  const projectsProfile = await prisma.projectsProfile.findFirst({
    select: {
      id: true,
      premium: true,
    },
    where: {
      userId: user.id,
    },
  });

  return {
    isViewerPremium: projectsProfile?.premium ?? false,
    projectsProfileId: projectsProfile?.id ?? null,
    userId: user.id,
  };
}
