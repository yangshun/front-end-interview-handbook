import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import ProjectsImageComparison from '~/components/projects/common/ProjectsImageComparison';

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
        desktop: '/img/projects/desktop.png',
        mobile: '/img/projects/mobile.png',
        tablet: '/img/projects/tablet.png',
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
    <ProjectsImageComparison
      baseScreenshots={baseScreenshots}
      mode="display"
      showDimensions={true}
    />
  );
}
