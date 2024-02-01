'use client';

import ProjectsChallengeHeader from './ProjectsChallengeHeader';
import ProjectsChallengeGetStartedDialog from '../get-started/ProjectsChallengeGetStartedDialog';
import ProjectsChallengeSessionContextProvider, {
  useProjectsChallengeSessionContext,
} from '../ProjectsChallengeSessionContext';
import ProjectsChallengeStepsTabsImpl from '../steps/ProjectsChallengeStepsTabsImpl';
import type { ProjectsChallengeItem } from '../types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  children: React.ReactNode;
}>;

export function ProjectsChallengeHeaderLayoutImpl({
  challenge,
  children,
}: Props) {
  const { slug } = challenge.metadata;

  const {
    isGetStartedDialogShown,
    setIsGetStartedDialogShown,
    startSession,
    isStartSessionLoading,
  } = useProjectsChallengeSessionContext();

  return (
    <div className="flex flex-col items-stretch gap-16">
      <ProjectsChallengeHeader challenge={challenge} />
      <ProjectsChallengeStepsTabsImpl challenge={challenge} />
      {children}
      <ProjectsChallengeGetStartedDialog
        challenge={challenge}
        isLoading={isStartSessionLoading}
        isShown={isGetStartedDialogShown}
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
  challenge,
  children,
}: Props) {
  const { slug } = challenge.metadata;

  return (
    <ProjectsChallengeSessionContextProvider slug={slug}>
      <ProjectsChallengeHeaderLayoutImpl challenge={challenge}>
        {children}
      </ProjectsChallengeHeaderLayoutImpl>
    </ProjectsChallengeSessionContextProvider>
  );
}
