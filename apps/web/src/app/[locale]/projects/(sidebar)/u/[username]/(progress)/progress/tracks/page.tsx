import { notFound } from 'next/navigation';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTrackSection from '~/components/projects/tracks/ProjectsTrackSection';
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
    <ProjectsTrackSection
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      defaultOpen={true}
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={viewerId != null && viewerId === userProfile.id}
      projectTracks={tracks}
      userProfile={userProfile}
    />
  );
}
