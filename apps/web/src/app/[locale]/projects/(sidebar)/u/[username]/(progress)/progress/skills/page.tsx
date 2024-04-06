import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { fetchProjectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';
import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

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
    pathname: `/projects/u/${username}/progress/skills`,
    title: intl.formatMessage(
      {
        defaultMessage: `Skills | Progress | {name}`,
        description: 'Title of user profile skills page',
        id: 'A7OrXR',
      },
      {
        name: userProfile.name || userProfile.username,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { username } = params;
  const viewer = await readViewerFromToken();
  const [{ viewerProjectsProfile }, userProfile] = await Promise.all([
    fetchViewerProjectsProfile(viewer),
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

  const skillsRoadmap = await fetchProjectsSkillsRoadmapSectionData(
    userProfile?.id,
  );

  return (
    <ProjectsSkillRoadmapSection
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={false}
      skillsRoadmap={skillsRoadmap}
      userProfile={userProfile}
    />
  );
}
