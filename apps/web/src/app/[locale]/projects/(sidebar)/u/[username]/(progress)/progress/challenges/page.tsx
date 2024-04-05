import { notFound } from 'next/navigation';

import ProjectsProfileProgressAllChallengesTab from '~/components/projects/profile/progress/ProjectsProfileProgressAllChallengesTab';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const [{ viewerId, viewerProjectsProfile }, userProfile] = await Promise.all([
    fetchViewerProjectsProfile(),
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

  const isViewingOwnProfile = viewerId === userProfile.id;

  return (
    <ProjectsProfileProgressAllChallengesTab
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={isViewingOwnProfile}
      targetUserId={userProfile.id}
    />
  );
}
