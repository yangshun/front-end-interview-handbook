import { fetchViewerProfile } from '~/components/auth/fetchViewerProfile';
import ProjectsProfileProgressSkillsTab from '~/components/projects/profile/progress/ProjectsProfileProgressSkillsTab';
import { projectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const viewer = await readViewerFromToken();
  const [viewerProfile, skillsRoadmap] = await Promise.all([
    fetchViewerProfile(viewer),
    projectsSkillsRoadmapSectionData(viewer?.id),
  ]);

  return (
    <ProjectsProfileProgressSkillsTab
      canOpenDetails={true}
      skillsRoadmap={skillsRoadmap}
      userProfile={viewerProfile}
    />
  );
}
