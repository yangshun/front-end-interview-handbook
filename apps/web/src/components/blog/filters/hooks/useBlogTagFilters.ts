import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { BlogFilter } from '~/components/blog/filters/BlogFilterType';
import { useIntl } from '~/components/intl';

// TODO(blog): Read all available tags from ContentLayer.
const TAG_OPTIONS: ReadonlyArray<{
  label: string;
  value: string;
}> = [
  { label: 'Career', value: 'career' },
  { label: 'CSS', value: 'css' },
  { label: 'Interviews', value: 'interviews' },
  { label: 'JavaScript', value: 'javascript' },
  { label: 'Scalability', value: 'scalability' },
  { label: 'Performance', value: 'performance' },
  { label: 'React', value: 'react' },
];

type Props = Readonly<{
  namespace: string;
}>;

export default function useBlogTagFilter({
  namespace,
}: Props): [Set<string>, BlogFilter<string>] {
  const intl = useIntl();
  const [tagFilters, setTagFilters] = useSessionStorageForSets<string>(
    `gfe:${namespace}:tag-filter`,
    new Set(),
  );

  const tagFilterOptions: BlogFilter<string> = {
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
