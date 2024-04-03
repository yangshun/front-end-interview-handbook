import { fetchViewerProfile } from '~/components/auth/fetchViewerProfile';
import ProjectsProfileProgressSkillsTab from '~/components/projects/profile/progress/ProjectsProfileProgressSkillsTab';
import { fetchProjectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

export default async function Page() {
  const viewer = await readViewerFromToken();
  const [viewerProfile, { viewerProjectsProfile }, skillsRoadmap] =
    await Promise.all([
      fetchViewerProfile(viewer),
      fetchViewerProjectsProfile(viewer),
      fetchProjectsSkillsRoadmapSectionData(viewer?.id),
    ]);

  return (
    <ProjectsProfileProgressSkillsTab
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      skillsRoadmap={skillsRoadmap}
      userProfile={viewerProfile}
    />
  );
}
