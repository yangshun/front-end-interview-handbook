import { trpc } from '~/hooks/trpc';

import ProjectsTrackAccordion from '~/components/projects/tracks/ProjectsTrackAccordion';
import ProjectsTrackAccordionItem from '~/components/projects/tracks/ProjectsTrackAccordionItem';
import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';

type Props = Readonly<{
  defaultOpen?: boolean;
  isViewerPremium: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  targetUserId: string | null;
}>;

export default function ProjectsTrackSection({
  defaultOpen,
  projectTracks,
  targetUserId,
  isViewerPremium,
}: Props) {
  const { data: challengeStatuses } =
    trpc.projects.challenges.progress.useQuery(
      { userId: targetUserId! },
      {
        enabled: targetUserId != null,
      },
    );

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
          challengeStatuses={challengeStatuses ?? {}}
          isViewerPremium={isViewerPremium}
          track={projectTrack}
        />
      ))}
    </ProjectsTrackAccordion>
  );
}
