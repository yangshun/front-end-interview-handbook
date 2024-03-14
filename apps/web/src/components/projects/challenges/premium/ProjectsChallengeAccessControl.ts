import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import type { ProjectsViewerProjectsProfile } from '../../types';

export type ProjectsChallengeAccessControlViewContents =
  | 'RESUBSCRIBE'
  | 'SUBSCRIBE'
  | 'UNLOCK'
  | 'YES';
export type ProjectsChallengeAccessControlFigmaDownload =
  | 'SUBSCRIBE'
  | 'UNLOCK'
  | 'YES';
export type ProjectsChallengeAccessControlFields = Readonly<{
  downloadFigma: ProjectsChallengeAccessControlFigmaDownload;
  viewContents: ProjectsChallengeAccessControlViewContents;
}>;

export default function ProjectsChallengeAccessControl(
  challengeAccess: ProjectsChallengeMetadata['access'],
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null,
  viewerUnlockedAccess: boolean,
): ProjectsChallengeAccessControlFields {
  if (challengeAccess === 'free') {
    return {
      downloadFigma: 'YES',
      viewContents: 'YES',
    };
  }

  if (challengeAccess === 'free-plus') {
    return {
      downloadFigma: viewerProjectsProfile?.premium
        ? viewerUnlockedAccess
          ? 'YES'
          : 'UNLOCK'
        : 'SUBSCRIBE',
      viewContents: 'YES',
    };
  }

  if (challengeAccess === 'premium' && viewerProjectsProfile?.premium) {
    return {
      downloadFigma: viewerUnlockedAccess ? 'YES' : 'UNLOCK',
      viewContents: viewerUnlockedAccess ? 'YES' : 'UNLOCK',
    };
  }

  return {
    downloadFigma: 'SUBSCRIBE',
    viewContents:
      (viewerProjectsProfile?.credits ?? 0) > 0 ? 'RESUBSCRIBE' : 'SUBSCRIBE',
  };
}
