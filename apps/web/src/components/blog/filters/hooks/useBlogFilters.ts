import type { BlogMetadata } from '~/components/blog/BlogTypes';
import blogMatchesTextQuery from '~/components/blog/filters/blogMatchesTextQuery';
import useBlogLevelFilter from '~/components/blog/filters/hooks/useBlogLevelFilter';
import useBlogSearchFilter from '~/components/blog/filters/hooks/useBlogSearchFilter';
import useBlogTagFilter from '~/components/blog/filters/hooks/useBlogTagFilters';

type Props = Readonly<{
  namespace: string;
}>;

export default function useBlogFilters({ namespace }: Props) {
  // Filtering.
  const [query, setQuery] = useBlogSearchFilter({ namespace });
  const [levelFilters, levelFilterOptions] = useBlogLevelFilter({
    namespace,
  });
  const [tagFilters, tagFilterOptions] = useBlogTagFilter({
    namespace,
  });

  const filters: ReadonlyArray<[number, (blog: BlogMetadata) => boolean]> = [
    // Query.
    [0, (blog) => blogMatchesTextQuery(blog, query)],
    // Level.
    [levelFilters.size, levelFilterOptions.matches],
    // Tag.
    [tagFilters.size, tagFilterOptions.matches],
  ];

  return {
    filters,
    levelFilterOptions,
    levelFilters,
    query,
    setQuery,
    tagFilterOptions,
    tagFilters,
  };
}
