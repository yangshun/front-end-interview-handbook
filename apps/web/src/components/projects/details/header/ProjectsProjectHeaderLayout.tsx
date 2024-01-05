'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps } from 'react';

import Container from '~/components/ui/Container';

import ProjectsProjectHeader from './ProjectsProjectHeader';
import ProjectsProjectSessionContextProvider, {
  useProjectsProjectSessionContext,
} from '../ProjectsProjectSessionContext';
import ProjectsProjectStepsTabsImpl from '../ProjectsProjectStepsTabsImpl';
import ProjectsProjectBeforeYouGetStartedDialog from '../resources/ProjectsProjectBeforeYouGetStartedDialog';
import type { ProjectsProjectMetadata } from '../types';

type Props = Readonly<{
  children: React.ReactNode;
  project: ProjectsProjectMetadata;
}>;

export function ProjectsProjectHeaderLayoutImpl({ project, children }: Props) {
  const { slug } = project;

  const segment =
    (useSelectedLayoutSegment() as ComponentProps<
      typeof ProjectsProjectStepsTabsImpl
    >['value']) || 'project-brief';

  const { isGetStartedDialogShown, setIsGetStartedDialogShown, startSession } =
    useProjectsProjectSessionContext();

  return (
    <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16 gap-16">
      <ProjectsProjectHeader project={project} />
      <ProjectsProjectStepsTabsImpl project={project} value={segment} />
      {children}
      <ProjectsProjectBeforeYouGetStartedDialog
        isShown={isGetStartedDialogShown}
        onClose={() => {
          setIsGetStartedDialogShown(false);
        }}
        onStart={() => {
          startSession(slug);
        }}
      />
    </Container>
  );
}
export default function ProjectsProjectHeaderLayout({
  project,
  children,
}: Props) {
  const { slug } = project;

  return (
    <ProjectsProjectSessionContextProvider slug={slug}>
      <ProjectsProjectHeaderLayoutImpl project={project}>
        {children}
      </ProjectsProjectHeaderLayoutImpl>
    </ProjectsProjectSessionContextProvider>
  );
}
