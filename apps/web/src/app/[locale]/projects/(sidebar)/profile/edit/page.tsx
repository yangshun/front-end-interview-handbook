import { redirect } from 'next/navigation';
import url from 'node:url';

import ProjectsProfileEditPage from '~/components/projects/profile/edit/ProjectsProfileEditPage';

import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const viewer = await readViewerFromToken();

  if (viewer == null) {
    return redirect(
      url.format({
        pathname: '/login',
        query: {
          next: '/projects/profile/edit',
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

  // If no user profile.
  if (viewerProfile == null) {
    return redirect(`/projects/challenges`);
  }

  const { projectsProfile } = viewerProfile;

  // If no projects profile
  if (projectsProfile == null) {
    return redirect(`/projects/onboarding`);
  }

  return (
    <ProjectsProfileEditPage
      userProfile={{
        ...viewerProfile,
        projectsProfile,
      }}
    />
  );
}
