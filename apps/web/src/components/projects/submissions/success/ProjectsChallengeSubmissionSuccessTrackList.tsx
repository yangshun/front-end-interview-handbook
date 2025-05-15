import type { ProjectsChallengeHistoricalStatuses } from '~/components/projects/challenges/types';
import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';

import ProjectsChallengeSubmissionSuccessTrackCard from './ProjectsChallengeSubmissionSuccessTrackCard';

type Props = Readonly<{
  challengeStatuses?: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  tracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsChallengeSubmissionSuccessTrackList({
  challengeStatuses,
  isViewerPremium,
  tracks,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {tracks.map((track) => (
        <ProjectsChallengeSubmissionSuccessTrackCard
          key={track.info._id}
          challengeStatuses={challengeStatuses}
          isViewerPremium={isViewerPremium}
          track={track}
        />
      ))}
    </div>
  );
}
