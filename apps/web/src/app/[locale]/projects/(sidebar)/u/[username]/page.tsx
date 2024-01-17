import { notFound, redirect } from 'next/navigation';

import ProjectsProfilePage from '~/components/projects/profile/ProjectsProfilePage';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';
import { readUserFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const [user, userProfile] = await Promise.all([
    readUserFromToken(),
    prisma.profile.findUnique({
      include: {
        projectsProfile: true,
      },
      where: {
        username: params.username,
      },
    }),
  ]);

  // If no user profile.
  if (userProfile == null) {
    return redirect(`/projects/challenges`);
  }

  const isViewingOwnProfile = user?.id === userProfile.id;

  const { projectsProfile } = userProfile;

  // If no projects profile.
  if (projectsProfile == null) {
    if (isViewingOwnProfile) {
      return redirect(`/projects/onboarding`);
    }

    // Non-existent user.
    return notFound();
  }

  const { locale } = params;
  const { tracks } = await readProjectsTrackList(locale);

  return (
    <ProjectsProfilePage
      initialUserProfile={{
        ...userProfile,
        projectsProfile,
      }}
      isViewingOwnProfile={isViewingOwnProfile}
      projectTracks={tracks}
    />
  );
}
