import { redirect } from 'next/navigation';
import url from 'node:url';

import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

// This page is just for redirecting a logged-in user to their profile homepage.
export default async function Page() {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/projects/profile',
        },
      }),
    );
  }

  const viewerProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: viewer.id,
    },
  });

  // If no user profile, which is impossible.
  if (viewerProfile == null) {
    return redirect(`/projects/challenges`);
  }

  return redirect(`/projects/u/${viewerProfile.username}`);
}
