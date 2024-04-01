import { fetchViewerProfile } from '~/components/auth/fetchViewerProfile';
import ProjectsProfileProgressSkillsTab from '~/components/projects/profile/progress/ProjectsProfileProgressSkillsTab';
import { fetchProjectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const viewer = await readViewerFromToken();
  const [viewerProfile, skillsRoadmap] = await Promise.all([
    fetchViewerProfile(viewer),
    fetchProjectsSkillsRoadmapSectionData(viewer?.id),
  ]);

  return (
    <ProjectsProfileProgressSkillsTab
      isViewingOwnProfile={true}
      skillsRoadmap={skillsRoadmap}
      userProfile={viewerProfile}
    />
  );
}
