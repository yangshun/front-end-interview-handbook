import { redirect } from 'next/navigation';

import { redirectToLoginPageIfNotLoggedIn } from '~/components/auth/redirectToLoginPageIfNotLoggedIn';

import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

// This page is just for redirecting a logged-in user to their profile homepage.
export default async function Page() {
  await redirectToLoginPageIfNotLoggedIn('/projects/profile');

  const viewer = await readViewerFromToken();
  const viewerProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: viewer!.id,
    },
  });

  // If no user profile, which is impossible.
  if (viewerProfile == null) {
    return redirect(`/projects/challenges`);
  }

  return redirect(`/projects/u/${viewerProfile.username}`);
}
