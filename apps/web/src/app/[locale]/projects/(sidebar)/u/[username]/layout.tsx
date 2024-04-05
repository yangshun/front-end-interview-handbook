import { notFound, redirect } from 'next/navigation';

import ProjectsProfilePage from '~/components/projects/profile/ProjectsProfilePage';

import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: React.ReactNode;
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Layout({ children, params }: Props) {
  const [viewer, userProfile] = await Promise.all([
    readViewerFromToken(),
    prisma.profile.findUnique({
      include: {
        projectsProfile: true,
      },
      where: {
        username: params.username,
      },
    }),
  ]);

  // If no such user.
  if (userProfile == null) {
    return notFound();
  }

  const isViewingOwnProfile = viewer?.id === userProfile.id;
  const { projectsProfile } = userProfile;

  // If no projects profile.
  if (projectsProfile == null) {
    if (isViewingOwnProfile) {
      return redirect('/projects/onboarding');
    }

    // User does not have projects profile.
    return notFound();
  }

  return (
    <ProjectsProfilePage
      isViewingOwnProfile={isViewingOwnProfile}
      userProfile={{
        ...userProfile,
        projectsProfile,
      }}>
      {children}
    </ProjectsProfilePage>
  );
}
