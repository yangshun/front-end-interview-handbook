import { RiDiscussLine, RiRocketLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

export type ProjectsMainTabCategory = 'contributions' | 'progress';

type TabItem = Readonly<{
  href: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  label: string;
  value: ProjectsMainTabCategory;
}>;

export default function useProjectsCategoryTabs(): ReadonlyArray<TabItem> {
  const intl = useIntl();

  return [
    {
      href: '/',
      icon: RiRocketLine,
      label: intl.formatMessage({
        defaultMessage: 'Project progress',
        description: 'Project progress item label',
        id: '1i1F/f',
      }),
      value: 'progress',
    },
    {
      href: '/community',
      icon: RiDiscussLine,
      label: intl.formatMessage({
        defaultMessage: 'Community contributions',
        description: 'Community contributions item label',
        id: 'jb3oKk',
      }),
      value: 'contributions',
    },
  ];
}
