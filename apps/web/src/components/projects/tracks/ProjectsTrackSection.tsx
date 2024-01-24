import { trpc } from '~/hooks/trpc';

import ProjectsTrackAccordion from '~/components/projects/tracks/ProjectsTrackAccordion';
import ProjectsTrackAccordionItem from '~/components/projects/tracks/ProjectsTrackAccordionItem';
import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';

type Props = Readonly<{
  defaultOpen?: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  userId: string | null;
}>;

export default function ProjectsTrackSection({
  defaultOpen,
  projectTracks,
  userId,
}: Props) {
  const { data: challengeStatuses } =
    trpc.projects.challenges.progressStatus.useQuery(
      { userId: userId! },
      {
        enabled: userId != null,
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
          track={projectTrack}
        />
      ))}
    </ProjectsTrackAccordion>
  );
}
