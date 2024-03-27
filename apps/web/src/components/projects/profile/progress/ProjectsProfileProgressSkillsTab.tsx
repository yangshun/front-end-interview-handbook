'use client';

import ProjectsSkillRoadmapSection from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapSection';

import type { ProjectsSkillRoadmapSectionData } from '../../skills/types';

type Props = Readonly<{
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
}>;

export default function ProjectsProfileProgressSkillsTab({
  skillsRoadmap,
}: Props) {
  return <ProjectsSkillRoadmapSection skillsRoadmap={skillsRoadmap} />;
}
