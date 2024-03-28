'use client';

import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';

import type { ProjectsSkillRoadmapSectionData } from '../../skills/types';

type Props = Readonly<{
  canOpenDetails?: boolean;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  userProfile: React.ComponentProps<
    typeof ProjectsSkillRoadmapSection
  >['userProfile'];
}>;

export default function ProjectsProfileProgressSkillsTab({
  canOpenDetails,
  skillsRoadmap,
  userProfile,
}: Props) {
  return (
    <ProjectsSkillRoadmapSection
      canOpenDetails={canOpenDetails}
      skillsRoadmap={skillsRoadmap}
      userProfile={userProfile}
    />
  );
}
