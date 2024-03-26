import ProjectsSkillRoadmapDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapDetails';

import { readProjectsSkillMetadata } from '~/db/projects/ProjectsReader';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const [viewer, { skillMetadata }] = await Promise.all([
    readViewerFromToken(),
    readProjectsSkillMetadata(slug, locale),
  ]);

  return (
    <ProjectsSkillRoadmapDetails
      skillMetadata={skillMetadata}
      viewerId={viewer?.id}
    />
  );
}
