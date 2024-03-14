'use client';

import ProjectsChallengeHeader from './ProjectsChallengeHeader';
import ProjectsChallengeGetStartedDialog from '../get-started/ProjectsChallengeGetStartedDialog';
import type { ProjectsChallengeAccessControlFields } from '../premium/ProjectsChallengeAccessControl';
import ProjectsChallengeSessionContextProvider, {
  useProjectsChallengeSessionContext,
} from '../session/ProjectsChallengeSessionContext';
import ProjectsChallengeStepsTabsImpl from '../steps/ProjectsChallengeStepsTabsImpl';
import type { ProjectsChallengeItem } from '../types';
import type { ProjectsViewerProjectsProfile } from '../../types';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  children: React.ReactNode;
  viewerAccess: ProjectsChallengeAccessControlFields;
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null;
}>;

export function ProjectsChallengeHeaderLayoutImpl({
  challenge,
  children,
  viewerAccess,
  viewerProjectsProfile,
}: Props) {
  const {
    isGetStartedDialogShown,
    setIsGetStartedDialogShown,
    startSession,
    isStartSessionLoading,
  } = useProjectsChallengeSessionContext();

  return (
    <div className="flex flex-col items-stretch gap-10">
      <ProjectsChallengeHeader
        challenge={challenge}
        viewerAccess={viewerAccess}
        viewerProjectsProfile={viewerProjectsProfile}
      />
      <ProjectsChallengeStepsTabsImpl challenge={challenge} />
      {children}
      <ProjectsChallengeGetStartedDialog
        challenge={challenge}
        isLoading={isStartSessionLoading}
        isShown={isGetStartedDialogShown}
        onClose={() => {
          setIsGetStartedDialogShown(false);
        }}
        onStart={async (skills) => {
          await startSession(skills);
        }}
      />
    </div>
  );
}
export default function ProjectsChallengeHeaderLayout({
  challenge,
  children,
  viewerAccess,
  viewerProjectsProfile,
}: Props) {
  const { slug } = challenge.metadata;

  return (
    <ProjectsChallengeSessionContextProvider slug={slug}>
      <ProjectsChallengeHeaderLayoutImpl
        challenge={challenge}
        viewerAccess={viewerAccess}
        viewerProjectsProfile={viewerProjectsProfile}>
        {children}
      </ProjectsChallengeHeaderLayoutImpl>
    </ProjectsChallengeSessionContextProvider>
  );
}
