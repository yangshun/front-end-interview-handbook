import type { ProjectsChallengeMetadata } from 'contentlayer/generated';

import type { ProjectsViewerProjectsProfile } from '../../types';

export type ProjectsPremiumAccessControlType =
  | 'ACCESSIBLE_TO_EVERYONE'
  | 'INSUFFICIENT_CREDITS'
  | 'RESUBSCRIBE_TO_ACCESS'
  | 'RESUBSCRIBE_TO_UNLOCK'
  | 'SUBSCRIBE'
  | 'UNLOCK'
  | 'UNLOCKED';

export type ProjectsPremiumAccessControlFields = Readonly<{
  downloadFigma: ProjectsPremiumAccessControlType;
  downloadStarterFiles: ProjectsPremiumAccessControlType;
  viewChallenge: ProjectsPremiumAccessControlType;
  viewGuides: ProjectsPremiumAccessControlType;
  viewSubmission: ProjectsPremiumAccessControlType;
}>;

export default function ProjectsPremiumAccessControl(
  challengeAccess: ProjectsChallengeMetadata['access'],
  viewerProjectsProfile: ProjectsViewerProjectsProfile | null,
  viewerUnlockedAccess: boolean,
): ProjectsPremiumAccessControlFields {
  if (challengeAccess === 'free') {
    return {
      downloadFigma: 'ACCESSIBLE_TO_EVERYONE',
      downloadStarterFiles: 'ACCESSIBLE_TO_EVERYONE',
      viewChallenge: 'ACCESSIBLE_TO_EVERYONE',
      viewGuides: 'ACCESSIBLE_TO_EVERYONE',
      viewSubmission: 'ACCESSIBLE_TO_EVERYONE',
    };
  }

  const viewerAccess: ProjectsPremiumAccessControlType = (() => {
    const credits = viewerProjectsProfile?.credits ?? 0;

    if (viewerProjectsProfile?.premium) {
      if (viewerUnlockedAccess) {
        return 'UNLOCKED';
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
      downloadStarterFiles: 'ACCESSIBLE_TO_EVERYONE',
      viewChallenge: 'ACCESSIBLE_TO_EVERYONE',
      viewGuides: viewerAccess,
      viewSubmission: 'ACCESSIBLE_TO_EVERYONE',
    };
  }

  // Premium challenges.
  return {
    downloadFigma: viewerAccess,
    downloadStarterFiles: viewerAccess,
    viewChallenge: viewerAccess,
    viewGuides: viewerAccess,
    viewSubmission: viewerAccess,
  };
}
