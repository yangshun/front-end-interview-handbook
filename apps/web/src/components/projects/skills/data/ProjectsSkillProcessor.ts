import { skillsRoadmap } from './ProjectsSkillRoadmapData';
import type { ProjectsSkillKey } from '../types';

function projectsSkillsAllRoadmapSkills(): ReadonlyArray<ProjectsSkillKey> {
  const skills: Array<ProjectsSkillKey> = [];

  skillsRoadmap.forEach((levelItem) => {
    levelItem.items.forEach((groupItem) => {
      skills.push(...groupItem.items.map((skill) => skill.key));
    });
  });

  return skills;
}

export const allRoadmapSkills = projectsSkillsAllRoadmapSkills();
export const allRoadmapSkillsSet = new Set(allRoadmapSkills);

export function projectsSkillsCategorized(
  skills: ReadonlyArray<ProjectsSkillKey>,
): Readonly<{
  roadmapSkills: Array<ProjectsSkillKey>;
  techStackSkills: Array<ProjectsSkillKey>;
}> {
  const roadmapSkills: Array<ProjectsSkillKey> = [];
  const techStackSkills: Array<ProjectsSkillKey> = [];

  skills.forEach((skill) => {
    if (allRoadmapSkillsSet.has(skill)) {
      roadmapSkills.push(skill);
    } else {
      techStackSkills.push(skill);
    }
  });

  return { roadmapSkills, techStackSkills };
}
