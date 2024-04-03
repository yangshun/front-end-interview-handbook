import { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';
import type { ProjectsSkillKey } from '../types';

export function projectsSkillDetermineParentSkill(skillKey: ProjectsSkillKey) {
  for (const category of skillsRoadmapConfig) {
    for (const parentSkill of category.items) {
      // TODO(projects): improve typing.
      if ((parentSkill.items as ReadonlyArray<string>).includes(skillKey)) {
        return parentSkill;
      }
    }
  }
}

export function projectsSkillExtractParents(
  skills: ReadonlyArray<ProjectsSkillKey>,
) {
  const skillsSet = new Set(skills);
  const parentSkillsSet = new Set();
  const parentSkillsItems: Array<{
    className: string;
    key: string;
  }> = [];

  skillsRoadmapConfig.forEach((levelItem) => {
    levelItem.items.forEach((parentSkillItem) => {
      parentSkillItem.items.forEach((skillKey) => {
        if (
          skillsSet.has(skillKey) &&
          !parentSkillsSet.has(parentSkillItem.key)
        ) {
          parentSkillsSet.add(parentSkillItem.key);
          parentSkillsItems.push({
            className: parentSkillItem.tagClassname,
            key: parentSkillItem.key,
          });
        }
      });
    });
  });

  return parentSkillsItems;
}
