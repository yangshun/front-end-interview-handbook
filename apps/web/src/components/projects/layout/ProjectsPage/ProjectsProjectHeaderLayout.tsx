'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps } from 'react';

import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';

import ProjectsProjectBreakdownTabsImpl from './ProjectsProjectBreakdownTabsImpl';
import ProjectsProjectHeader from '../../projects/ProjectsProjectHeader';
import type { ProjectsProject } from '../../projects/types';

type Props = Readonly<{
  children: React.ReactNode;
  project: ProjectsProject;
}>;

export default function ProjectsProjectHeaderLayout({
  project,
  children,
}: Props) {
  const { slug } = project;

  const segment = useSelectedLayoutSegment() as ComponentProps<
    typeof ProjectsProjectBreakdownTabsImpl
  >['value'];

  const hasSession = false;

  return (
    <CardContainer>
      <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16">
        <ProjectsProjectHeader hasSession={hasSession} project={project} />
        <ProjectsProjectBreakdownTabsImpl
          className="mb-16 mt-16"
          slug={slug}
          value={segment}
        />
        {children}
      </Container>
    </CardContainer>
  );
}
