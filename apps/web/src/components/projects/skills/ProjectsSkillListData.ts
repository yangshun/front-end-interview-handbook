import type { ProjectsSkillKey } from './types';

export const ProjectsSkillLabels: Record<ProjectsSkillKey, string> = {
  angular: 'Angular',
  css: 'CSS',
  html: 'HTML',
  js: 'JS',
  nextjs: 'Next.js',
  react: 'React',
  svelte: 'Svelte',
  tailwind: 'Tailwind',
  vue: 'Vue',
};

export function ProjectsSkillOptions() {
  return Object.entries(ProjectsSkillLabels).map(([value, label]) => ({
    label,
    value,
  }));
}
