import ProjectsMarketingComponentTrackAccordion from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordion';
import ProjectsMarketingComponentTrackAccordionItem from '~/components/projects/marketing/ProjectsMarketingComponentTrackAccordionItem';
import type { ProjectsTrack } from '~/components/projects/tracks/ProjectsTracksData';
import Section from '~/components/ui/Heading/HeadingContext';

type Props = Readonly<{
  projectTracks: ReadonlyArray<ProjectsTrack>;
}>;

export default function ProjectsComponentTrackTab({ projectTracks }: Props) {
  return (
    <Section>
      <ProjectsMarketingComponentTrackAccordion>
        {projectTracks.map((projectTrack) => (
          <ProjectsMarketingComponentTrackAccordionItem
            key={projectTrack.metadata.slug}
            track={projectTrack}
          />
        ))}
      </ProjectsMarketingComponentTrackAccordion>
    </Section>
  );
}
