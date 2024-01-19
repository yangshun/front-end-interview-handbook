import { useIntl } from 'react-intl';

export type ProjectsCommunityContributionsTabCategory = 'others' | 'reviews';

type TabItem = Readonly<{
  label: string;
  value: ProjectsCommunityContributionsTabCategory;
}>;

export default function useProjectsCommunityContributionsTabs(): ReadonlyArray<TabItem> {
  const intl = useIntl();

  return [
    {
      label: intl.formatMessage({
        defaultMessage: 'Code reviews',
        description: 'Code reviews item label',
        id: 'VXu04X',
      }),
      value: 'reviews',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Others',
        description: 'Others item label',
        id: 'E10QYm',
      }),
      value: 'others',
    },
  ];
}
