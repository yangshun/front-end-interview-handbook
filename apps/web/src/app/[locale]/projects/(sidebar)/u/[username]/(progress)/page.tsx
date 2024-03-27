import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsProfileProgressSection from '~/components/projects/profile/progress/ProjectsProfileProgressSection';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import prisma from '~/server/prisma';

type Props = Readonly<{
  params: Readonly<{ locale: string; username: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, username } = params;

  const [intl, userProfile] = await Promise.all([
    getIntlServerOnly(locale),
    prisma.profile.findUnique({
      where: {
        username,
      },
    }),
  ]);

  // If no such user.
  if (userProfile == null) {
    return notFound();
  }

  return defaultMetadata({
    description: userProfile!.bio ?? '',
    locale,
    pathname: `/projects/u/${username}`,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{username} | Profile | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects profile page',
        id: 'tpddLF',
      },
      {
        username,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const [{ viewerId, viewerProjectsProfile }, userProfile] = await Promise.all([
    readViewerProjectsProfile(),
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
    <ProjectsProfileProgressSection
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={isViewingOwnProfile}
      targetUserId={userProfile.id}
    />
  );
}
