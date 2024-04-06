import type { Metadata } from 'next';

import { fetchViewerProfile } from '~/components/auth/fetchViewerProfile';
import { fetchProjectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';
import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{
    locale: string;
  }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = params;

  const intl = await getIntlServerOnly(locale);

  return defaultProjectsMetadata(intl, {
    locale,
    pathname: '/projects/dashboard/progress/skills',
    title: intl.formatMessage({
      defaultMessage: 'Skills | Progress | Dashboard',
      description: 'Title of skills section on dashboard page',
      id: 'mACTSv',
    }),
  });
}

export default async function Page() {
  const viewer = await readViewerFromToken();
  const [viewerProfile, { viewerProjectsProfile }, skillsRoadmap] =
    await Promise.all([
      fetchViewerProfile(viewer),
      fetchViewerProjectsProfile(viewer),
      fetchProjectsSkillsRoadmapSectionData(viewer?.id),
    ]);

  return (
    <ProjectsSkillRoadmapSection
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      skillsRoadmap={skillsRoadmap}
      userProfile={viewerProfile}
    />
  );
}
