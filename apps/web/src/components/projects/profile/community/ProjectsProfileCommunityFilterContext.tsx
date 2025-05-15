import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import { useIntl } from '~/components/intl';

export type ProjectsProfileCommunityFilterKey =
  | 'contribution-type'
  | 'forum-type';

export type ProjectsProfileCommunityFilter = {
  id: ProjectsProfileCommunityFilterKey;
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
    const filters: Array<ProjectsProfileCommunityFilter> = [
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
            label: intl.formatMessage({
              defaultMessage: 'Code reviews',
              description: 'Contribution type label',
              id: 'eob+FL',
            }),
            value: 'CODE_REVIEW',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Questions',
              description: 'Contribution type label',
              id: 'yjtkxM',
            }),
            value: 'QUESTION',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Others',
              description: 'Others label',
              id: 'CGkwJv',
            }),
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
            label: intl.formatMessage({
              defaultMessage: 'Challenge discussion',
              description: 'Forum type label',
              id: 'uLd16i',
            }),
            value: 'PROJECTS_CHALLENGE',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'User submission discussion',
              description: 'Forum type label',
              id: '40LE98',
            }),
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

type ProjectsProfileCommunityFilterContextType = {
  clearAll: () => void;
  filters: Array<ProjectsProfileCommunityFilter>;
  getArrayTypeSearchParams: (key: string) => Array<string> | undefined;
  setFilterValue: (
    key: ProjectsProfileCommunityFilterKey,
    value: Array<string>,
  ) => void;
  setSelectedFilters: (
    value: Record<ProjectsProfileCommunityFilterKey, Array<string>>,
  ) => void;
  value: Record<ProjectsProfileCommunityFilterKey, Array<string>>;
};

export const ProjectsProfileCommunityFilterContext =
  createContext<ProjectsProfileCommunityFilterContextType>({
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

export function useProjectsProfileCommunityFilterState(
  key: ProjectsProfileCommunityFilterKey,
) {
  const { setFilterValue, value } = useContext(
    ProjectsProfileCommunityFilterContext,
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

export function useProjectsProfileCommunityFilterContext() {
  return useContext(ProjectsProfileCommunityFilterContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsProfileCommunityFilterContextProvider({
  children,
}: Props) {
  const { getArrayTypeSearchParams } = useFilterSearchParams();

  const initialContributionType = getArrayTypeSearchParams('contribution-type');
  const initialForumType = getArrayTypeSearchParams('forum-type');

  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsProfileCommunityFilterKey, Array<string>>
  >({
    'contribution-type': initialContributionType ?? [],
    'forum-type': initialForumType ?? [],
  });

  const filters = useFilters();

  const setFilterValue = useCallback(
    (key: ProjectsProfileCommunityFilterKey, value: Array<string>) => {
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
    <ProjectsProfileCommunityFilterContext.Provider value={value}>
      {children}
    </ProjectsProfileCommunityFilterContext.Provider>
  );
}
