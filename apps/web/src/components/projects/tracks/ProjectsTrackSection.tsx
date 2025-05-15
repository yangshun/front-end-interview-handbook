import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';
import ProjectsTrackAccordion from '~/components/projects/tracks/ProjectsTrackAccordion';
import ProjectsTrackAccordionItem from '~/components/projects/tracks/ProjectsTrackAccordionItem';

import type { ProjectsChallengeHistoricalStatuses } from '../challenges/types';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  defaultOpen?: boolean;
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userProfile: React.ComponentProps<
    typeof ProjectsTrackAccordionItem
  >['userProfile'];
}>;

export default function ProjectsTrackSection({
  challengeHistoricalStatuses,
  defaultOpen,
  isViewerPremium,
  isViewingOwnProfile,
  projectTracks,
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
          isViewingOwnProfile={isViewingOwnProfile}
          track={projectTrack}
          userProfile={userProfile}
        />
      ))}
    </ProjectsTrackAccordion>
  );
}
