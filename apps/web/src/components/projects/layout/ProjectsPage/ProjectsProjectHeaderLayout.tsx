'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps } from 'react';

import CardContainer from '~/components/ui/Card/CardContainer';
import Container from '~/components/ui/Container';

import ProjectsProjectBreakdownTabsImpl from './ProjectsProjectBreakdownTabsImpl';
import ProjectsProjectBeforeYouGetStartedDialog from '../../projects/before-you-get-started/ProjectsProjectBeforeYouGetStartedDialog';
import ProjectsProjectHeader from '../../projects/ProjectsProjectHeader';
import ProjectsProjectSessionContextProvider, {
  useProjectsProjectSessionContext,
} from '../../projects/ProjectsProjectSessionContext';
import type { ProjectsProjectMetadata } from '../../projects/types';

type Props = Readonly<{
  children: React.ReactNode;
  project: ProjectsProjectMetadata;
}>;

export function ProjectsProjectHeaderLayoutImpl({ project, children }: Props) {
  const { slug } = project;

  const segment = useSelectedLayoutSegment() as ComponentProps<
    typeof ProjectsProjectBreakdownTabsImpl
  >['value'];

  const { isGetStartedDialogShown, setIsGetStartedDialogShown, startSession } =
    useProjectsProjectSessionContext();

  return (
    <CardContainer>
      <Container className="flex flex-col items-stretch pb-10 pt-4 lg:pb-20 lg:pt-16">
        <ProjectsProjectBeforeYouGetStartedDialog
          isShown={isGetStartedDialogShown}
          onClose={() => {
            setIsGetStartedDialogShown(false);
          }}
          onStart={() => {
            startSession(slug);
          }}
        />
        <ProjectsProjectHeader project={project} />
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
