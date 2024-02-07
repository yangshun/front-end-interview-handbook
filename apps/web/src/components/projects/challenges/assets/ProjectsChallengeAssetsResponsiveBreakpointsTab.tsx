import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsComparison from '~/components/projects/common/ProjectsComparison';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeAssetsResponsiveBreakpointsTab({
  challenge,
}: Props) {
  // TODO(projects): Pick from challenge assets
  const baseScreenshots = [
    {
      label: 'Homepage',
      screenshots: {
        desktop: challenge.metadata.imageUrl,
        mobile: challenge.metadata.imageUrl,
        tablet: challenge.metadata.imageUrl,
      },
    },
    {
      label: 'Dashboard',
      screenshots: {
        desktop:
          'https://source.unsplash.com/random/1080x700?random=${page.label}',
        mobile:
          'https://source.unsplash.com/random/480x700?random=${page.label}',
        tablet:
          'https://source.unsplash.com/random/700x700?random=${page.label}',
      },
    },
  ];

  return (
    <ProjectsComparison
      baseScreenshots={baseScreenshots}
      mode="display"
      showDimensions={true}
    />
  );
}
