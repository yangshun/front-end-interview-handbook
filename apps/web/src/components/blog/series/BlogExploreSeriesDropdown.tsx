import type { BlogSeriesNavigationLink } from '~/components/blog/BlogSidebar';
import Select from '~/components/ui/Select';

type Props = Readonly<{
  activeItem: string;
  navigation: ReadonlyArray<BlogSeriesNavigationLink>;
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
    value: series.href,
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
