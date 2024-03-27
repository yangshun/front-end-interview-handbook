import { skillsRoadmapConfig } from '../data/ProjectsSkillRoadmapConfigData';
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

  skillsRoadmapConfig.forEach((levelItem) => {
    levelItem.items.forEach((groupItem) => {
      groupItem.items.forEach((skillKey) => {
        if (skillsSet.has(skillKey) && !skillGroupsSet.has(groupItem.key)) {
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
