import type { ReactNode } from 'react';

import ProjectsSkillRoadmapLayout from '~/components/projects/skills/roadmap/ProjectsSkillRoadmapLayout';

type Props = Readonly<{
  children: ReactNode;
}>;

export default function Layout({ children }: Props) {
  return <ProjectsSkillRoadmapLayout>{children}</ProjectsSkillRoadmapLayout>;
}
