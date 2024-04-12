import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsImageComparison from '~/components/projects/common/ProjectsImageComparison';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeAssetsResponsiveBreakpointsTab({
  challenge,
}: Props) {
  return (
    <ProjectsImageComparison
      mode="display"
      showDimensions={true}
      specImagesForVariant={challenge.metadata.specImages.default}
    />
  );
}
