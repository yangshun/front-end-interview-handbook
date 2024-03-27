import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import NpmLogo from '~/components/icons/NpmLogo';

import type { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';

export type ProjectsSkillGroupType =
  (typeof skillsRoadmapConfig)[number]['items'][number]['key'];

export const ProjectsSkillIcons: Record<
  ProjectsSkillGroupType,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  css: CSS3Logo,
  'css-advanced': CSS3Logo,
  html: HTML5Logo,
  javascript: JavaScriptLogo,
  'package-managers': NpmLogo,
};
