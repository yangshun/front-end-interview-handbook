'use client';

import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';

import type { ProjectsChallengeHistoricalStatuses } from '../challenges/types';
import { projectsChallengeCountCompletedIncludingHistorical } from '../challenges/utils/ProjectsChallengeUtils';
import type ProjectsTrackChallengeChip from './ProjectsTrackChallengeChip';
import ProjectsTrackChallengesList from './ProjectsTrackChallengesList';
import ProjectsTrackPageHeader from './ProjectsTrackPageHeader';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  track: ProjectsTrackItem;
  userProfile: React.ComponentProps<
    typeof ProjectsTrackChallengeChip
  >['userProfile'];
}>;

export default function ProjectsTrackDetailsPage({
  challengeHistoricalStatuses,
  isViewerPremium,
  track,
  userProfile,
}: Props) {
  const { challenges, points } = track;
  const completionCount = projectsChallengeCountCompletedIncludingHistorical(
    challengeHistoricalStatuses ?? {},
    challenges,
  );

  return (
    <div className="flex flex-col gap-12">
      <ProjectsTrackPageHeader
        completedCount={completionCount}
        isViewerPremium={isViewerPremium}
        points={points}
        showProgress={true}
        totalCount={challenges.length}
        track={track}
      />
      <ProjectsTrackChallengesList
        challenges={challenges}
        userProfile={userProfile}
      />
    </div>
  );
}
