import { fetchViewerProfile } from '~/components/auth/fetchViewerProfile';
import { fetchProjectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';
import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';
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
    <ProjectsSkillRoadmapSection
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      skillsRoadmap={skillsRoadmap}
      userProfile={viewerProfile}
    />
  );
}
