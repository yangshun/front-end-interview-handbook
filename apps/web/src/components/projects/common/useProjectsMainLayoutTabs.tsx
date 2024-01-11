import {
  RiCheckboxMultipleLine,
  RiNodeTree,
  RiRocketLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

export type ProjectsMainLayoutTabCategory =
  | 'all-projects'
  | 'skill-tree'
  | 'tracks';

type TabItem = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: ProjectsMainLayoutTabCategory;
  label: string;
  type: 'link';
}>;

export default function useProjectsMainLayoutTabs(): ReadonlyArray<TabItem> {
  const intl = useIntl();

  return [
    {
      href: '/projects/all',
      icon: RiRocketLine,
      key: 'all-projects',
      label: intl.formatMessage({
        defaultMessage: 'All projects',
        description: 'Label for All projects sidebar item in Projects sidebar',
        id: 'm8b+T6',
      }),
      type: 'link',
    },
    {
      href: '/projects/skill-tree',
      icon: RiNodeTree,
      key: 'skill-tree',
      label: intl.formatMessage({
        defaultMessage: 'Skill tree',
        description: 'Label for Skill Tree sidebar item in Projects sidebar',
        id: 'FC61kC',
      }),
      type: 'link',
    },
    {
      href: '/projects/tracks',
      icon: RiCheckboxMultipleLine,
      key: 'tracks',
      label: intl.formatMessage({
        defaultMessage: 'Component tracks',
        description:
          'Label for Component Tracks sidebar item in Projects sidebar',
        id: 'bdjVW4',
      }),
      type: 'link',
    },
  ] as const;
}
