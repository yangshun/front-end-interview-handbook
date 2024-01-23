import ProjectsTrackAccordion from '~/components/projects/tracks/ProjectsTrackAccordion';
import ProjectsTrackAccordionItem from '~/components/projects/tracks/ProjectsTrackAccordionItem';
import type { ProjectsTrackItem } from '~/components/projects/tracks/ProjectsTracksData';

type Props = Readonly<{
  defaultOpen?: boolean;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsTrackSection({
  defaultOpen,
  projectTracks,
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
          track={projectTrack}
        />
      ))}
    </ProjectsTrackAccordion>
  );
}
