import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsImageDisplay from '~/components/projects/common/ProjectsImageDisplay';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeAssetsResponsiveBreakpointsTab({
  challenge,
}: Props) {
  return (
    <ProjectsImageDisplay
      specImagesForVariant={challenge.metadata.specImages.default}
      specLabels={challenge.metadata.specLabels}
    />
  );
}
