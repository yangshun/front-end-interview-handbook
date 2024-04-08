import type { BlogCategory } from 'contentlayer/generated';

import Select from '~/components/ui/Select';

type Props = Readonly<{
  activeItem: string;
  navigation: ReadonlyArray<BlogCategory>;
  onChange: (value: string) => void;
}>;

export default function BlogExploreSeriesDropdown({
  navigation,
  onChange,
  activeItem,
}: Props) {
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
      label="Blog Series Select"
      options={seriesOptions}
      value={activeItem}
      onChange={onChange}
    />
  );
}
