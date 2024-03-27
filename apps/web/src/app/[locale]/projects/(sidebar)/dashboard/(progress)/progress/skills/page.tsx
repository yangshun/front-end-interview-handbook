import ProjectsProfileProgressSkillsTab from '~/components/projects/profile/progress/ProjectsProfileProgressSkillsTab';
import { projectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const viewer = await readViewerFromToken();
  const skillsRoadmap = await projectsSkillsRoadmapSectionData(viewer?.id);

  return <ProjectsProfileProgressSkillsTab skillsRoadmap={skillsRoadmap} />;
}
