import type {
  ProjectsTrackInfo,
  ProjectsTrackMetadata,
} from 'contentlayer/generated';

import { getProjectsTrackThemeApps } from '~/components/projects/tracks/items/ProjectsTrackDesignApps';
import { getProjectsTrackThemeEcommerce } from '~/components/projects/tracks/items/ProjectsTrackDesignEcommerce';
import { getProjectsTrackThemeDesignSystem } from '~/components/projects/tracks/items/ProjectsTrackDesignSystem';
import { getProjectsTrackThemeMarketing } from '~/components/projects/tracks/items/ProjectsTrackMarketing';
import type { ThemeGradient } from '~/components/ui/theme';

import type {
  ProjectsChallengeItem,
  ProjectsTrackType,
} from '../../challenges/types';

export type ProjectsTrackItem = Readonly<{
  challenges: ReadonlyArray<ProjectsChallengeItem>;
  info: ProjectsTrackInfo;
  metadata: ProjectsTrackMetadata;
  points: number;
}>;

export type ProjectsTrackTheme = Readonly<{
  gradient: ThemeGradient;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
}>;

export function getProjectsTrackTheme(
  focusArea: ProjectsTrackType,
): ProjectsTrackTheme {
  switch (focusArea) {
    case 'design-system':
      return getProjectsTrackThemeDesignSystem();
    case 'marketing':
      return getProjectsTrackThemeMarketing();
    case 'apps':
      return getProjectsTrackThemeApps();
    case 'e-commerce':
      return getProjectsTrackThemeEcommerce();
  }
}
