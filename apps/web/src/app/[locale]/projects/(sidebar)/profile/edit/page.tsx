import { redirect } from 'next/navigation';
import url from 'node:url';

import ProjectsProfileEditPage from '~/components/projects/profile/edit/ProjectsProfileEditPage';

import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const user = await readUserFromToken();

  if (user == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/projects/profile/edit',
        },
      }),
    );
  }

  const userProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      id: user.id,
    },
  });

  // If no user profile.
  if (userProfile == null) {
    return redirect(`/projects/challenges`);
  }

  const { projectsProfile } = userProfile;

  // If no projects profile
  if (projectsProfile == null) {
    return redirect(`/projects/onboarding`);
  }

  return (
    <ProjectsProfileEditPage
      userProfile={{
        ...userProfile,
        projectsProfile,
      }}
    />
  );
}
