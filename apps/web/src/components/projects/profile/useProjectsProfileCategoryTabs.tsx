import { RiDiscussLine, RiRocketLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';

export type ProjectsProfileTabCategory = 'community' | 'progress';

type TabItem = Readonly<{
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  relativePath: string;
  value: ProjectsProfileTabCategory;
}>;

export default function useProjectsProfileCategoryTabs(): ReadonlyArray<TabItem> {
  const intl = useIntl();

  return [
    {
      icon: RiRocketLine,
      label: intl.formatMessage({
        defaultMessage: 'Project progress',
        description: 'Project progress item label',
        id: '1i1F/f',
      }),
      relativePath: '/progress',
      value: 'progress',
    },
    {
      icon: RiDiscussLine,
      label: intl.formatMessage({
        defaultMessage: 'Community contributions',
        description: 'Community contributions item label',
        id: 'jb3oKk',
      }),
      relativePath: '/community',
      value: 'community',
    },
  ];
}
