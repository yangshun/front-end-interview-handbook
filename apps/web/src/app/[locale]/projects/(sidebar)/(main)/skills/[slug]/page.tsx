import ProjectsSkillRoadmapDetails from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapDetails';

import { readProjectsSkillMetadata } from '~/db/projects/ProjectsReader';

type Props = Readonly<{
  params: Readonly<{ locale: string; slug: string }>;
}>;

export default async function Page({ params }: Props) {
  const { locale, slug } = params;

  const { skillMetadata } = await readProjectsSkillMetadata(slug, locale);

  return <ProjectsSkillRoadmapDetails skillMetadata={skillMetadata} />;
}
