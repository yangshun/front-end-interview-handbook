import type { ReactNode } from 'react';

import { fetchViewerProfile } from '~/components/auth/fetchViewerProfile';
import { fetchProjectsSkillsRoadmapSectionData } from '~/components/projects/skills/data/ProjectsSkillReader';
import ProjectsSkillRoadmapLayout from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapLayout';
import readViewerProjectsProfile from '~/components/projects/utils/readViewerProjectsProfile';

import { readViewerFromToken } from '~/supabase/SupabaseServerGFE';

type Props = Readonly<{
  children: ReactNode;
}>;

export default async function Layout({ children }: Props) {
  const viewer = await readViewerFromToken();
  const [viewerProfile, { viewerProjectsProfile }, skillsRoadmap] =
    await Promise.all([
      fetchViewerProfile(viewer),
      readViewerProjectsProfile(viewer),
      fetchProjectsSkillsRoadmapSectionData(viewer?.id),
    ]);

  return (
    <ProjectsSkillRoadmapLayout
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      skillsRoadmap={skillsRoadmap}
      userProfile={viewerProfile}>
      {children}
    </ProjectsSkillRoadmapLayout>
  );
}
