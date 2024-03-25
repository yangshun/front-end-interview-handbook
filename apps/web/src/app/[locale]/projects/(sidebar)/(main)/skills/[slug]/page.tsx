import ProjectsSkillRoadmapDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapDetails';

import {
  readProjectsChallengesForSkill,
  readProjectsSkillMetadata,
} from '~/db/projects/ProjectsReader';
import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, slug } = params;
  const viewer = await readViewerFromToken();

  const [{ skillMetadata }, { challenges }] = await Promise.all([
    readProjectsSkillMetadata(slug, locale),
    readProjectsChallengesForSkill(slug, locale, viewer?.id),
  ]);

  return (
    <ProjectsSkillRoadmapDetails
      challenges={challenges}
      skillMetadata={skillMetadata}
    />
  );
}
