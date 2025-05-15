'use client';

import type { BlogCategory } from 'contentlayer/generated';

import { useIntl } from '~/components/intl';
import Select from '~/components/ui/Select';

type Props = Readonly<{
  activeItem: string;
  navigation: ReadonlyArray<BlogCategory>;
  onChange: (value: string) => void;
}>;

export default function BlogExploreSeriesDropdown({
  activeItem,
  navigation,
  onChange,
}: Props) {
  const intl = useIntl();
  const seriesOptions: ReadonlyArray<{
    label: string;
    value: string;
  }> = navigation.map((series) => ({
    label: series.title,
    value: series.source,
  }));

  return (
    <Select
      display="block"
      isLabelHidden={true}
      label={intl.formatMessage({
        defaultMessage: 'Blog Series',
        description: 'Blog series dropdown label',
        id: 'tXDJDH',
      })}
      options={seriesOptions}
      value={activeItem}
      onChange={onChange}
    />
  );
}
