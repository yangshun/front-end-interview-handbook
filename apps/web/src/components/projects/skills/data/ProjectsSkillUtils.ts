import { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';
import type { ProjectsSkillKey } from '../types';

export function projectsSkillDetermineGroup(
  skillKey: ProjectsSkillKey,
): ProjectsSkillKey | undefined {
  for (const category of skillsRoadmapConfig) {
    for (const group of category.items) {
      // TODO(projects): improve typing.
      if ((group.items as ReadonlyArray<string>).includes(skillKey)) {
        return group.key;
      }
    }
  }
}
