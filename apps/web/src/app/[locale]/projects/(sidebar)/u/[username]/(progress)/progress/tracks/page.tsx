import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  fetchProjectsTrackChallengeHistoricalStatuses,
  readProjectsTrackList,
} from '~/components/projects/tracks/data/ProjectsTrackReader';
import ProjectsTrackSection from '~/components/projects/tracks/ProjectsTrackSection';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
    username: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = params;

  const [intl, userProfile] = await Promise.all([
    getIntlServerOnly(locale),
    prisma.profile.findUnique({
      where: {
        username: params.username,
      },
    }),
  ]);

  if (!userProfile) {
    return notFound();
  }

  return defaultProjectsMetadata(intl, {
    locale,
    pathname: `/projects/u/${username}/progress/tracks`,
    title: intl.formatMessage(
      {
        defaultMessage: `Tracks | Progress | {name}`,
        description: 'Title of user profile progress tracks page',
        id: '9NUuQM',
      },
      {
        name: userProfile.name || userProfile.username,
      },
    ),
  });
}

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
