import type { Metadata } from 'next';

import { projectsSkillLabel } from '~/components/projects/skills/data/ProjectsSkillListData';
import ProjectsSkillRoadmapItemDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapItemDetails';

import { readProjectsSkillMetadata } from '~/db/projects/ProjectsReader';
import { getIntlServerOnly } from '~/i18n';
import defaultMetadata from '~/seo/defaultMetadata';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = params;
  const [intl, { skillMetadata }] = await Promise.all([
    getIntlServerOnly(locale),
    readProjectsSkillMetadata(slug, locale),
  ]);

  return defaultMetadata({
    description: intl.formatMessage(
      {
        defaultMessage:
          'Practice using {skillName} by completing relevant challenges',
        description: 'Description of Projects skill details page',
        id: 'fF83z4',
      },
      {
        skillName: projectsSkillLabel(skillMetadata.slug),
      },
    ),
    locale,
    pathname: `/projects/skills/${slug}`,
    title: intl.formatMessage(
      {
        defaultMessage:
          '{skillName} | Skills | GreatFrontEnd Projects - Real-world project challenges',
        description: 'Title of Projects skill details page',
        id: 'kMoUxI',
      },
      {
        skillName: projectsSkillLabel(skillMetadata.slug),
      },
    ),
  });
}

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const [viewer, { skillMetadata }] = await Promise.all([
    readViewerFromToken(),
    readProjectsSkillMetadata(slug, locale),
  ]);

  return (
    <ProjectsSkillRoadmapItemDetails
      skillMetadata={skillMetadata}
      viewerId={viewer?.id}
    />
  );
}
