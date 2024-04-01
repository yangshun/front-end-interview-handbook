'use client';

import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';

import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';
import ProjectsTrackSection from '../../tracks/ProjectsTrackSection';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userProfile: React.ComponentProps<typeof ProjectsTrackSection>['userProfile'];
}>;

export default function ProjectsProfileProgressTracksTab({
  challengeHistoricalStatuses,
  isViewerPremium,
  isViewingOwnProfile,
  projectTracks,
  userProfile,
}: Props) {
  return (
    <ProjectsTrackSection
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      defaultOpen={true}
      isViewerPremium={isViewerPremium}
      isViewingOwnProfile={isViewingOwnProfile}
      projectTracks={projectTracks}
      userProfile={userProfile}
    />
  );
}
