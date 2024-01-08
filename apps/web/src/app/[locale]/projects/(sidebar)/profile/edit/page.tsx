import { notFound, redirect } from 'next/navigation';

import ProjectsProfileEditPage from '~/components/projects/profile/edit/ProjectsProfileEditPage';

import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const user = await readUserFromToken();

  if (user == null) {
    return redirect(
      `/login?next=${encodeURIComponent(`/projects/profile/edit`)}`,
    );
  }

  const profile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: user.id,
    },
  });

  // If no user profile or no projects profile
  if (profile === null || profile?.projectsProfile.length === 0) {
    // TODO(projects): Redirect to projects onboarding page.
    return notFound();
  }

  return <ProjectsProfileEditPage profile={profile} />;
}
