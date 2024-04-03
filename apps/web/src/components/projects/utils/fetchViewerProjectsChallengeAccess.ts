import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function fetchViewerProjectsChallengeAccess(
  slug: string,
): Promise<boolean> {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return false;
  }

  const challengeAccess = await prisma.projectsChallengeAccess.findFirst({
    select: {
      id: true,
    },
    where: {
      projectsProfile: {
        userId: viewer.id,
      },
      slug,
    },
  });

  return challengeAccess != null;
}
