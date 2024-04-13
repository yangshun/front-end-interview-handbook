import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function fetchViewerProjectsChallengeAccess(
  slug: string,
  userParam?: Readonly<{
    email: string; // User Email.
    id: string; // User ID.
  }> | null,
): Promise<boolean> {
  let viewer = userParam ?? null;

  if (viewer == null) {
    viewer = await readViewerFromToken();
  }

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
