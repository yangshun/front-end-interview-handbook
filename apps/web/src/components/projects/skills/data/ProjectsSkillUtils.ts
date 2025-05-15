import type { ProjectsSkillKey } from '../types';
import { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';

export function projectsSkillDetermineParentSkill(skillKey: ProjectsSkillKey) {
  for (const category of skillsRoadmapConfig) {
    for (const parentSkill of category.items) {
      if (
        // TODO(projects): improve typing.
        (
          parentSkill.items.map(({ key }) => key) as ReadonlyArray<string>
        ).includes(skillKey)
      ) {
        return parentSkill;
      }
    }
  }
}

export function projectsSkillFindChildSkill(skillKey: ProjectsSkillKey) {
  for (const category of skillsRoadmapConfig) {
    for (const parentSkill of category.items) {
      for (const childSkill of parentSkill.items) {
        if (childSkill.key === skillKey) {
          return childSkill;
        }
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
      parentSkillItem.items.forEach(({ key: skillKey }) => {
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

export function projectsSkillRoadmapItemLabelsDict() {
  const obj: Record<string, string> = {};

  skillsRoadmapConfig.forEach((levelItem) => {
    levelItem.items.forEach((parentSkillItem) => {
      obj[parentSkillItem.key] = parentSkillItem.title;
      parentSkillItem.items.forEach((childSkill) => {
        obj[childSkill.key] = childSkill.label;
      });
    });
  });

  return obj;
}
