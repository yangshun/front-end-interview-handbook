import { useIntl } from 'react-intl';

import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { BlogTagType } from '~/components/blog/BlogTypes';
import type { BlogFilter } from '~/components/blog/filters/BlogFilterType';

const TAG_OPTIONS: ReadonlyArray<{
  label: string;
  value: BlogTagType;
}> = [
  { label: 'Performance', value: 'performance' },
  { label: 'Marketing', value: 'marketing' },
  { label: 'Network', value: 'network' },
  { label: 'Security', value: 'security' },
];

type Props = Readonly<{
  namespace: string;
}>;

export default function useBlogTagFilter({
  namespace,
}: Props): [Set<BlogTagType>, BlogFilter<BlogTagType>] {
  const intl = useIntl();
  const [tagFilters, setTagFilters] = useSessionStorageForSets<BlogTagType>(
    `gfe:${namespace}:tag-filter`,
    new Set(),
  );

  const tagFilterOptions: BlogFilter<BlogTagType> = {
    id: 'tag',
    matches: (blog) =>
      tagFilters.size === 0 || blog.tags.some((tag) => tagFilters.has(tag)),
    name: intl.formatMessage({
      defaultMessage: 'Tags',
      description: 'Blog Tags',
      id: '99F7Mt',
    }),
    onChange: (value) => {
      const newTags = new Set(tagFilters);

      newTags.has(value) ? newTags.delete(value) : newTags.add(value);
      setTagFilters(newTags);
    },
    options: TAG_OPTIONS,
  };

  return [tagFilters, tagFilterOptions];
}
