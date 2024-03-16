import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import type { ProjectsViewerProjectsProfile } from '../../types';

export type ProjectsPremiumAccessControlType =
  | 'INSUFFICIENT_CREDITS'
  | 'RESUBSCRIBE_TO_ACCESS'
  | 'RESUBSCRIBE_TO_UNLOCK'
  | 'SUBSCRIBE'
  | 'UNLOCK'
  | 'YES';

export type ProjectsPremiumAccessControlFields = Readonly<{
  downloadFigma: ProjectsPremiumAccessControlType;
  viewChallenge: ProjectsPremiumAccessControlType;
  viewSubmission: ProjectsPremiumAccessControlType;
}>;

export default function ProjectsPremiumAccessControl(
  challengeAccess: ProjectsChallengeMetadata['access'],
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null,
  viewerUnlockedAccess: boolean,
): ProjectsPremiumAccessControlFields {
  if (challengeAccess === 'free') {
    return {
      downloadFigma: 'YES',
      viewChallenge: 'YES',
      viewSubmission: 'YES',
    };
  }

  const viewerAccess: ProjectsPremiumAccessControlType = (() => {
    const credits = viewerProjectsProfile?.credits ?? 0;

    if (viewerProjectsProfile?.premium) {
      if (viewerUnlockedAccess) {
        return 'YES';
      }

      return credits > 0 ? 'UNLOCK' : 'INSUFFICIENT_CREDITS';
    }

    // Non-premium.
    if (viewerUnlockedAccess) {
      return 'RESUBSCRIBE_TO_ACCESS';
    }

    if (credits > 0) {
      return 'RESUBSCRIBE_TO_UNLOCK';
    }

    return 'SUBSCRIBE';
  })();

  if (challengeAccess === 'free-plus') {
    return {
      downloadFigma: viewerAccess,
      viewChallenge: 'YES',
      viewSubmission: 'YES',
    };
  }

  return {
    downloadFigma: viewerAccess,
    viewChallenge: viewerAccess,
    viewSubmission: viewerAccess,
  };
}
