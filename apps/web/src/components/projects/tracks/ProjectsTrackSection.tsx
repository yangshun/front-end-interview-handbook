import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';
import ProjectsTrackAccordion from '~/components/projects/tracks/ProjectsTrackAccordion';
import ProjectsTrackAccordionItem from '~/components/projects/tracks/ProjectsTrackAccordionItem';

import type { ProjectsChallengeHistoricalStatuses } from '../challenges/types';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  defaultOpen?: boolean;
  isViewerPremium: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userProfile: React.ComponentProps<
    typeof ProjectsTrackAccordionItem
  >['userProfile'];
}>;

export default function ProjectsTrackSection({
  challengeHistoricalStatuses,
  defaultOpen,
  projectTracks,
  isViewerPremium,
  userProfile,
}: Props) {
  return (
    <ProjectsTrackAccordion
      defaultValue={
        defaultOpen
          ? projectTracks.map((track) => track.metadata.slug)
          : undefined
      }>
      {projectTracks.map((projectTrack) => (
        <ProjectsTrackAccordionItem
          key={projectTrack.metadata.slug}
          challengeStatuses={challengeHistoricalStatuses}
          isViewerPremium={isViewerPremium}
          track={projectTrack}
          userProfile={userProfile}
        />
      ))}
    </ProjectsTrackAccordion>
  );
}
