'use client';

import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';

import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';
import ProjectsTrackSection from '../../tracks/ProjectsTrackSection';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userProfile: React.ComponentProps<typeof ProjectsTrackSection>['userProfile'];
}>;

export default function ProjectsProfileProgressTracksTab({
  challengeHistoricalStatuses,
  userProfile,
  isViewerPremium,
  projectTracks,
}: Props) {
  return (
    <ProjectsTrackSection
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      defaultOpen={true}
      isViewerPremium={isViewerPremium}
      projectTracks={projectTracks}
      userProfile={userProfile}
    />
  );
}
