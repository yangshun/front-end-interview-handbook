import type { ReactNode } from 'react';

import { projectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';
import ProjectsSkillRoadmapLayout from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapLayout';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const viewer = await readViewerFromToken();
  const skillsRoadmap = await projectsSkillsRoadmapSectionData(viewer?.id);

  return (
    <ProjectsSkillRoadmapLayout skillsRoadmap={skillsRoadmap}>
      {children}
    </ProjectsSkillRoadmapLayout>
  );
}
