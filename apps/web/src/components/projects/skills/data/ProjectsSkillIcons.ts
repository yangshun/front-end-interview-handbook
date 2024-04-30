import {
  RiBox1Line,
  RiCheckLine,
  RiDashboard2Line,
  RiHammerLine,
} from 'react-icons/ri';

import CSS3Logo from '~/components/icons/CSS3Logo';
import HTML5Logo from '~/components/icons/HTML5Logo';
import JavaScriptLogo from '~/components/icons/JavaScriptLogo';
import ReactLogo from '~/components/icons/ReactLogo';

import type { skillsRoadmapConfig } from './ProjectsSkillRoadmapConfigData';

export type ProjectsSkillGroupType =
  (typeof skillsRoadmapConfig)[number]['items'][number]['key'];

export const ProjectsSkillIcons: Record<
  ProjectsSkillGroupType,
  (props: React.ComponentProps<'svg'>) => JSX.Element
> = {
  'build-tools': RiHammerLine,
  css: CSS3Logo,
  html: HTML5Logo,
  javascript: JavaScriptLogo,
  'package-managers': RiBox1Line,
  performance: RiDashboard2Line,
  react: ReactLogo,
  testing: RiCheckLine,
};
