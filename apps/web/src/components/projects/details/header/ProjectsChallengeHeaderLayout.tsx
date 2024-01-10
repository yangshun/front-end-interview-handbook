'use client';

import { useSelectedLayoutSegment } from 'next/navigation';
import type { ComponentProps } from 'react';

import ProjectsChallengeHeader from './ProjectsChallengeHeader';
import ProjectsChallengeGetStartedDialog from '../get-started/ProjectsChallengeGetStartedDialog';
import ProjectsChallengeSessionContextProvider, {
  useProjectsChallengeSessionContext,
} from '../ProjectsChallengeSessionContext';
import ProjectsChallengeStepsTabsImpl from '../ProjectsChallengeStepsTabsImpl';
import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  children: React.ReactNode;
  project: ProjectsChallengeItem;
}>;

export function ProjectsChallengeHeaderLayoutImpl({
  project,
  children,
}: Props) {
  const { slug } = project.metadata;

  const segment =
    (useSelectedLayoutSegment() as ComponentProps<
      typeof ProjectsChallengeStepsTabsImpl
    >['value']) || 'project-brief';

  const {
    isGetStartedDialogShown,
    setIsGetStartedDialogShown,
    startSession,
    isStartSessionLoading,
  } = useProjectsChallengeSessionContext();

  return (
    <div className="flex flex-col items-stretch gap-16">
      <ProjectsChallengeHeader project={project} />
      <ProjectsChallengeStepsTabsImpl project={project} value={segment} />
      {children}
      <ProjectsChallengeGetStartedDialog
        isLoading={isStartSessionLoading}
        isShown={isGetStartedDialogShown}
        project={project}
        onClose={() => {
          setIsGetStartedDialogShown(false);
        }}
        onStart={async () => {
          await startSession(slug);
        }}
      />
    </div>
  );
}
export default function ProjectsChallengeHeaderLayout({
  project,
  children,
}: Props) {
  const { slug } = project.metadata;

  return (
    <ProjectsChallengeSessionContextProvider slug={slug}>
      <ProjectsChallengeHeaderLayoutImpl project={project}>
        {children}
      </ProjectsChallengeHeaderLayoutImpl>
    </ProjectsChallengeSessionContextProvider>
  );
}
