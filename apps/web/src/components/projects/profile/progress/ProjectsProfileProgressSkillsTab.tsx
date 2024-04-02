'use client';

import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';

import type { ProjectsSkillRoadmapSectionData } from '../../skills/types';

type Props = Readonly<{
  isViewerPremium: boolean;
  isViewingOwnProfile?: boolean;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  userProfile: React.ComponentProps<
    typeof ProjectsSkillRoadmapSection
  >['userProfile'];
}>;

export default function ProjectsProfileProgressSkillsTab({
  isViewerPremium,
  isViewingOwnProfile,
  skillsRoadmap,
  userProfile,
}: Props) {
  return (
    <ProjectsSkillRoadmapSection
      isViewerPremium={isViewerPremium}
      isViewingOwnProfile={isViewingOwnProfile}
      skillsRoadmap={skillsRoadmap}
      userProfile={userProfile}
    />
  );
}
