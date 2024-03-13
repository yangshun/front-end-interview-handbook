import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

export default async function readViewerProjectsChallengeAccess(
  slug: string,
): Promise<boolean> {
  const user = await readUserFromToken();

  if (user == null) {
    return false;
  }

  const challengeAccess = await prisma.projectsChallengeAccess.findFirst({
    select: {
      id: true,
    },
    where: {
      projectsProfile: {
        userId: user.id,
      },
      slug,
    },
  });

  return challengeAccess != null;
}
