import { startCase } from 'lodash-es';

import { allRoadmapSkillsSet } from './ProjectsSkillProcessor';
import type { ProjectsSkillKey } from '../types';

// TODO(projects): add in proper list.
export const ProjectsSkillLabels: Record<ProjectsSkillKey, string> = {
  angular: 'Angular',
  html: 'HTML',
  nextjs: 'Next.js',
  react: 'React',
  svelte: 'Svelte',
  tailwind: 'Tailwind',
  vue: 'Vue',
};

export function projectsSkillLabel(skillKey: ProjectsSkillKey): string {
  return ProjectsSkillLabels[skillKey] ?? startCase(skillKey);
}

export function ProjectsSkillArrayToTypeaheadValues(
  values: ReadonlyArray<ProjectsSkillKey>,
) {
  return values.map((value) => ({
    label: projectsSkillLabel(value),
    value,
  }));
}

export function ProjectsSkillTypeaheadValuesToArray(
  values: ReadonlyArray<
    Readonly<{ label: string; value: ProjectsSkillKey }>
  > | null,
) {
  return values?.map(({ value }) => value) ?? null;
}

export function projectsSkillTypeaheadOptions(excludeRoadmapSkills = true) {
  return Object.entries(ProjectsSkillLabels)
    .filter((pair) =>
      excludeRoadmapSkills ? !allRoadmapSkillsSet.has(pair[0]) : true,
    )
    .map(([value, label]) => ({
      label,
      value,
    }));
}
