import { skillsRoadmap } from '../data/ProjectsSkillRoadmapData';
import type { ProjectsSkillKey } from '../types';

export default function projectsSkillExtractGroups(
  skills: ReadonlyArray<ProjectsSkillKey>,
) {
  const skillsSet = new Set(skills);
  const skillGroupsSet = new Set();
  const skillGroupItems: Array<{
    className: string;
    key: string;
  }> = [];

  skillsRoadmap.forEach((levelItem) => {
    levelItem.items.forEach((groupItem) => {
      groupItem.items.forEach((skill) => {
        if (skillsSet.has(skill.key) && !skillGroupsSet.has(groupItem.key)) {
          skillGroupsSet.add(groupItem.key);
          skillGroupItems.push({
            className: groupItem.tagClassname,
            key: groupItem.key,
          });
        }
      });
    });
  });

  return skillGroupItems;
}
