import {
  RiCheckboxMultipleLine,
  RiNodeTree,
  RiRocketLine,
} from 'react-icons/ri';

import { useIntl } from '~/components/intl';

export type ProjectsMainLayoutTabCategory = 'challenges' | 'skills' | 'tracks';

type TabItem = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  key: ProjectsMainLayoutTabCategory;
  label: string;
  relativePathname: string;
  type: 'link';
}>;

export default function useProjectsMainLayoutTabs(): ReadonlyArray<TabItem> {
  const intl = useIntl();

  return [
    {
      icon: RiRocketLine,
      key: 'challenges',
      label: intl.formatMessage({
        defaultMessage: 'All challenges',
        description: 'All projects item label',
        id: 'uCT1Lh',
      }),
      relativePathname: '/challenges',
      type: 'link',
    },
    {
      icon: RiNodeTree,
      key: 'skills',
      label: intl.formatMessage({
        defaultMessage: 'Skills roadmap',
        description: 'Projects skills roadmap item label',
        id: 'n1RgqQ',
      }),
      relativePathname: '/skills',
      type: 'link',
    },
    {
      icon: RiCheckboxMultipleLine,
      key: 'tracks',
      label: intl.formatMessage({
        defaultMessage: 'Component tracks',
        description: 'Projects component tracks item label',
        id: 'dKoCFD',
      }),
      relativePathname: '/tracks',
      type: 'link',
    },
  ] as const;
}
