import prisma from '~/server/prisma';

import type { User } from '@supabase/supabase-js';

export default async function getProjectsProfileId(user: User) {
  const profile = await prisma.projectsProfile.findUnique({
    select: {
      id: true,
    },
    where: {
      userId: user.id,
    },
  });

  return profile?.id ?? null;
}
