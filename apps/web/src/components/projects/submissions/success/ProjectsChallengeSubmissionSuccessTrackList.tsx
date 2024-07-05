import type { ProjectsChallengeHistoricalStatuses } from '~/components/projects/challenges/types';
import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';

import ProjectsTrackCard from './ProjectsTrackCard';

type Props = Readonly<{
  challengeStatuses?: ProjectsChallengeHistoricalStatuses;
  isViewerPremium: boolean;
  tracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsChallengeSubmissionSuccessTrackList({
  tracks,
  challengeStatuses,
  isViewerPremium,
}: Props) {
  return (
    <div className="flex flex-col gap-4">
      {tracks.map((track) => (
        <ProjectsTrackCard
          key={track.info._id}
          challengeStatuses={challengeStatuses}
          isViewerPremium={isViewerPremium}
          track={track}
        />
      ))}
    </div>
  );
}
