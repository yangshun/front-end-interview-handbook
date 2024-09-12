import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import {
  readProjectsSkillInfo,
  readProjectsSkillMetadata,
} from '~/components/projects/skills/data/ProjectsSkillReader';
import ProjectsSkillRoadmapItemDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapItemDetails';
import ProjectsSkillRoadmapItemLockedPage from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapItemLockedPage';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { getIntlServerOnly } from '~/i18n';
import defaultProjectsMetadata from '~/seo/defaultProjectsMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { skillInfo }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsSkillInfo(slug, locale),
  ]);

  return defaultProjectsMetadata(intl, {
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice using {skillName} by completing relevant challenges',
        description: 'Description of Projects skill details page',
        id: 'fF83z4',
      },
      {
        skillName: skillInfo.title,
      },
    ),
    locale,
    pathname: `/projects/skills/${slug}`,
    title: intl.formatMessage(
      {
        defaultMessage: '{skillName} | Skills',
        description: 'Title of Projects skill details page',
        id: 'GO8CZI',
      },
      {
        skillName: skillInfo.title,
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const viewer = await readViewerFromToken();
  const [{ viewerProjectsProfile }, skillMetadata, { skillInfo }] =
    await Promise.all([
      fetchViewerProjectsProfile(viewer),
      readProjectsSkillMetadata(slug),
      readProjectsSkillInfo(slug, locale),
    ]);

  if (skillMetadata == null) {
    notFound();
  }

  if (skillMetadata.premium && !viewerProjectsProfile?.premium) {
    return <ProjectsSkillRoadmapItemLockedPage skillInfo={skillInfo} />;
  }

  return (
    <ProjectsSkillRoadmapItemDetails
      skillInfo={skillInfo}
      skillMetadata={skillMetadata}
      viewerId={viewer?.id}
    />
  );
}
