import {
  RiCheckboxMultipleLine,
  RiNodeTree,
  RiRocketLine,
} from 'react-icons/ri';
import { useIntl } from 'react-intl';

export type ProjectsMainLayoutTabCategory = 'challenges' | 'skills' | 'tracks';

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
      href: '/projects/challenges',
      icon: RiRocketLine,
      key: 'challenges',
      label: intl.formatMessage({
        defaultMessage: 'All challenges',
        description: 'All projects item label',
        id: 'uCT1Lh',
      }),
      type: 'link',
    },
    {
      href: '/projects/skills',
      icon: RiNodeTree,
      key: 'skills',
      label: intl.formatMessage({
        defaultMessage: 'Skills roadmap',
        description: 'Projects skills roadmap item label',
        id: 'n1RgqQ',
      }),
      type: 'link',
    },
    {
      href: '/projects/tracks',
      icon: RiCheckboxMultipleLine,
      key: 'tracks',
      label: intl.formatMessage({
        defaultMessage: 'Component tracks',
        description: 'Projects component tracks item label',
        id: 'dKoCFD',
      }),
      type: 'link',
    },
  ] as const;
}
