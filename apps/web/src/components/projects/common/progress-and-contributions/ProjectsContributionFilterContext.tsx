import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

export type ProjectsContributionFilterKey = 'contribution-type' | 'forum-type';

export type ProjectsContributionFilter = {
  id: ProjectsContributionFilterKey;
  label: string;
  longLabel?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  tooltip: string;
};

function useFilters() {
  const intl = useIntl();

  return useMemo(() => {
    const filters: Array<ProjectsContributionFilter> = [
      {
        id: 'contribution-type',
        label: intl.formatMessage({
          defaultMessage: 'Contribution type',
          description:
            'Label for contribution type filter for contribution list',
          id: 'XOtMNQ',
        }),
        options: [
          {
            label: 'Code reviews',
            value: 'CODE_REVIEW',
          },
          {
            label: 'Questions',
            value: 'QUESTION',
          },
          {
            label: 'Others',
            value: 'OTHER',
          },
        ],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by contribution type',
          description:
            'Tooltip for contribution type filter for contribution list',
          id: 'Oy+yWc',
        }),
      },
      {
        id: 'forum-type',
        label: intl.formatMessage({
          defaultMessage: 'Forum type',
          description: 'Label for forum type filter for contribution list',
          id: '5MW6Tr',
        }),
        options: [
          {
            label: 'Challenge discussions',
            value: 'PROJECTS_CHALLENGE',
          },
          {
            label: 'User submission discussions',
            value: 'PROJECTS_SUBMISSION',
          },
        ],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by forum type',
          description: 'Tooltip for forum type filter for contribution list',
          id: 't+sW3R',
        }),
      },
    ];

    return filters;
  }, [intl]);
}

type ProjectsContributionFilterContextType = {
  clearAll: () => void;
  filters: Array<ProjectsContributionFilter>;
  getArrayTypeSearchParams: (key: string) => Array<string> | undefined;
  setFilterValue: (
    key: ProjectsContributionFilterKey,
    value: Array<string>,
  ) => void;
  setSelectedFilters: (
    value: Record<ProjectsContributionFilterKey, Array<string>>,
  ) => void;
  value: Record<ProjectsContributionFilterKey, Array<string>>;
};

export const ProjectsContributionFilterContext =
  createContext<ProjectsContributionFilterContextType>({
    clearAll: () => {},
    filters: [],
    getArrayTypeSearchParams: () => [],
    setFilterValue: () => {},
    setSelectedFilters: () => {},
    value: {
      'contribution-type': [],
      'forum-type': [],
    },
  });

export function useProjectsContributionFilterState(
  key: ProjectsContributionFilterKey,
) {
  const { value, setFilterValue } = useContext(
    ProjectsContributionFilterContext,
  );

  return useMemo(
    () =>
      [
        value[key],
        (newValue: Array<string>) => setFilterValue(key, newValue),
      ] as const,
    [key, setFilterValue, value],
  );
}

export function useProjectsContributionFilterContext() {
  return useContext(ProjectsContributionFilterContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsContributionFilterContextProvider({
  children,
}: Props) {
  const { getArrayTypeSearchParams } = useFilterSearchParams();

  const initialContributionType = getArrayTypeSearchParams('contribution-type');
  const initialForumType = getArrayTypeSearchParams('forum-type');

  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsContributionFilterKey, Array<string>>
  >({
    'contribution-type': initialContributionType ?? [],
    'forum-type': initialForumType ?? [],
  });

  const filters = useFilters();

  const setFilterValue = useCallback(
    (key: ProjectsContributionFilterKey, value: Array<string>) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
  );

  const clearAll = useCallback(() => {
    setSelectedFilters({
      'contribution-type': [],
      'forum-type': [],
    });
  }, []);

  const value = useMemo(() => {
    return {
      clearAll,
      filters,
      getArrayTypeSearchParams,
      setFilterValue,
      setSelectedFilters,
      value: selectedFilters,
    };
  }, [
    filters,
    clearAll,
    selectedFilters,
    setFilterValue,
    getArrayTypeSearchParams,
  ]);

  return (
    <ProjectsContributionFilterContext.Provider value={value}>
      {children}
    </ProjectsContributionFilterContext.Provider>
  );
}
