import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsProfileProgressSectionAllChallenges from '~/components/projects/profile/progress/ProjectsProfileProgressSectionAllChallenges';
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
    pathname: `/projects/u/${username}/progress/challenges`,
    title: intl.formatMessage(
      {
        defaultMessage: `Challenges | Progress | {name}`,
        description: 'Title of user profile challenge page',
        id: 'RUj4TG',
      },
      {
        name: userProfile.name || userProfile.username,
      },
    ),
  });
}

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
    <ProjectsProfileProgressSectionAllChallenges
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={isViewingOwnProfile}
      targetUserId={userProfile.id}
    />
  );
}
