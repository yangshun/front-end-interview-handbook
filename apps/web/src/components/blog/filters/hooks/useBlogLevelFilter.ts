import useSessionStorageForSets from '~/hooks/useSessionStorageForSets';

import type { BlogLevel } from '~/components/blog/BlogTypes';
import type { BlogFilter } from '~/components/blog/filters/BlogFilterType';
import { useIntl } from '~/components/intl';

type Props = Readonly<{
  namespace: string;
}>;

export default function useBlogLevelFilter({
  namespace,
}: Props): [Set<BlogLevel>, BlogFilter<BlogLevel>] {
  const intl = useIntl();
  const LEVEL_OPTIONS: ReadonlyArray<{
    label: string;
    value: BlogLevel;
  }> = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Starter',
        description: 'Starter blog',
        id: 'tPpYwO',
      }),
      value: 'starter',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Intermediate',
        description: 'Intermediate blog',
        id: 'K6BzpD',
      }),
      value: 'intermediate',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Advanced',
        description: 'Advanced blog',
        id: 'fcKx8Z',
      }),
      value: 'advanced',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Nightmare',
        description: 'Nightmare blog',
        id: 'fXyTam',
      }),
      value: 'nightmare',
    },
  ];
  const [levelFilters, setLevelFilters] = useSessionStorageForSets<BlogLevel>(
    `gfe:${namespace}:level-filter`,
    new Set(),
  );
  const levelFilterOptions: BlogFilter<BlogLevel> = {
    id: 'difficulty',
    matches: (blog) => levelFilters.size === 0 || levelFilters.has(blog.level),
    name: intl.formatMessage({
      defaultMessage: 'Level',
      description: 'Blog Level',
      id: '7OMhXJ',
    }),
    onChange: (value) => {
      const newLevels = new Set(levelFilters);

      newLevels.has(value) ? newLevels.delete(value) : newLevels.add(value);
      setLevelFilters(newLevels);
    },
    options: LEVEL_OPTIONS,
  };

  return [levelFilters, levelFilterOptions];
}
