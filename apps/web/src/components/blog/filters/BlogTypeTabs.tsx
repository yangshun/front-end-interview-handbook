import { useIntl } from 'react-intl';

import TabsUnderline from '~/components/ui/Tabs/TabsUnderline';

export type FilterTab = 'articles' | 'series';

type Props = Readonly<{
  onSelect: (value: FilterTab) => void;
  value: FilterTab;
}>;

const DEFAULT_TABS: ReadonlyArray<FilterTab> = ['articles', 'series'];

export default function BlogTypeTabs({ value, onSelect }: Props) {
  const intl = useIntl();

  function getLabelForTab(value_: FilterTab) {
    switch (value_) {
      case 'articles': {
        return intl.formatMessage({
          defaultMessage: 'Articles',
          description: 'Label for articles blog',
          id: 'glQWNv',
        });
      }
      case 'series': {
        return intl.formatMessage({
          defaultMessage: 'Series',
          description: 'Label for series blog',
          id: 'RDN4Md',
        });
      }
    }
  }

  const tabItems: ReadonlyArray<{
    label: string;
    value: FilterTab;
  }> = DEFAULT_TABS.map((tab) => ({
    label: getLabelForTab(tab),
    value: tab,
  }));

  return (
    <TabsUnderline
      label={intl.formatMessage({
        defaultMessage: 'Blog Type',
        description: 'Label for tabs for blog type',
        id: 'Alqb51',
      })}
      size="sm"
      tabs={tabItems}
      value={value}
      onSelect={onSelect}
    />
  );
}
