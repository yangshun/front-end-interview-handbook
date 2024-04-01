'use client';

import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';

import type { ProjectsSkillRoadmapSectionData } from '../../skills/types';

type Props = Readonly<{
  isViewingOwnProfile?: boolean;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  userProfile: React.ComponentProps<
    typeof ProjectsSkillRoadmapSection
  >['userProfile'];
}>;

export default function ProjectsProfileProgressSkillsTab({
  isViewingOwnProfile,
  skillsRoadmap,
  userProfile,
}: Props) {
  return (
    <ProjectsSkillRoadmapSection
      isViewingOwnProfile={isViewingOwnProfile}
      skillsRoadmap={skillsRoadmap}
      userProfile={userProfile}
    />
  );
}
