import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export async function fetchViewerProfile(
  userParam?: Readonly<{
    email: string; // User Email.
    id: string; // User ID.
  }> | null,
) {
  let viewer = userParam ?? null;

  if (viewer == null) {
    viewer = await readViewerFromToken();
  }

  if (viewer == null) {
    return null;
  }

  return prisma.profile.findFirst({
    where: {
      id: viewer?.id,
    },
  });
}
