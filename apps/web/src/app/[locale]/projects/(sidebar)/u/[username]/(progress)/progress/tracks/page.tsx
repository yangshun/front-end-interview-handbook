import { notFound } from 'next/navigation';

import ProjectsProfileProgressTracksTab from '~/components/projects/profile/progress/ProjectsProfileProgressTracksTab';
import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, username } = params;
  const userProfile = await prisma.profile.findUnique({
    include: {
      projectsProfile: true,
    },
    where: {
      username,
    },
  });

  // If no such user.
  if (userProfile == null) {
    return notFound();
  }

  const [
    { viewerId, viewerProjectsProfile },
    { tracks },
    challengeHistoricalStatuses,
  ] = await Promise.all([
    fetchViewerProjectsProfile(),
    readProjectsTrackList(locale, userProfile.id),
    fetchProjectsTrackChallengeHistoricalStatuses(userProfile.id),
  ]);

  return (
    <ProjectsProfileProgressTracksTab
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={viewerId != null && viewerId === userProfile.id}
      projectTracks={tracks}
      userProfile={userProfile}
    />
  );
}
