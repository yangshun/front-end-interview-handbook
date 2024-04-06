import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import ProjectsProfileCommunitySection from '~/components/projects/profile/community/ProjectsProfileCommunitySection';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import prisma from '~/server/prisma';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

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
    pathname: `/projects/u/${username}/community`,
    title: intl.formatMessage(
      {
        defaultMessage: `Community | {name}`,
        description: 'Title of Projects Dashboard page',
        id: 'I8aJD5',
      },
      {
        name: userProfile.name || userProfile.username,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
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

  if (!userProfile) {
    return notFound();
  }

  const isViewingOwnProfile = viewer?.id === userProfile.id;

  return (
    <ProjectsProfileCommunitySection
      isViewingOwnProfile={isViewingOwnProfile}
      targetUserId={userProfile.id}
    />
  );
}
