import { notFound } from 'next/navigation';

import ProjectsProfileProgressTracksTab from '~/components/projects/profile/progress/ProjectsProfileProgressTracksTab';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readProjectsTrackList } from '~/db/projects/ProjectsReader';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale } = params;
  const [{ viewerProjectsProfile }, { tracks }, userProfile] =
    await Promise.all([
      readViewerProjectsProfile(),
      readProjectsTrackList(locale),
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

  return (
    <ProjectsProfileProgressTracksTab
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      projectTracks={tracks}
      userId={userProfile.id}
    />
  );
}
