import { allProjectsTrackMetadata } from 'contentlayer/generated';
import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

export type ProjectsChallengeFilterType = 'checkbox' | 'skill-selection';
export type ProjectsChallengeFilter = {
  id: ProjectsChallengeFilterKey;
  label: string;
  longLabel?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  tooltip: string;
  type: ProjectsChallengeFilterType;
};

export type ProjectsChallengeFilterKey =
  | 'component-track'
  | 'difficulty'
  | 'skills'
  | 'status';

function useFilters() {
  const intl = useIntl();

  return useMemo(() => {
    const filters: Array<ProjectsChallengeFilter> = [
      {
        id: 'component-track',
        label: intl.formatMessage({
          defaultMessage: 'Component track',
          description: 'Label for Component Track filter for projects list',
          id: '+R1wGb',
        }),
        options: allProjectsTrackMetadata.map((trackMetadata) => ({
          label: `${trackMetadata.title} track`,
          value: trackMetadata.slug,
        })),
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by component track',
          description: 'Tooltip for Component track filter for projects list',
          id: '03TVln',
        }),
        type: 'checkbox',
      },
      {
        id: 'skills',
        label: intl.formatMessage({
          defaultMessage: 'Skills',
          description: 'Label for Skills filter for projects list',
          id: 'wzV6ho',
        }),
        options: [
          {
            label: 'HTML',
            value: 'html',
          },
          {
            label: 'React',
            value: 'react',
          },
          {
            label: 'JS',
            value: 'js',
          },
        ],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by skills',
          description: 'Tooltip for Skills filter for projects list',
          id: 'KBkMan',
        }),
        type: 'skill-selection',
      },
      {
        id: 'difficulty',
        label: intl.formatMessage({
          defaultMessage: 'Difficulty',
          description: 'Label for Difficulty filter for projects list',
          id: 'qRBY3O',
        }),
        longLabel: intl.formatMessage({
          defaultMessage: 'Challenge difficulty',
          description: 'Label for Difficulty filter for projects list',
          id: 'WETxAT',
        }),
        options: [
          {
            label: 'Starter',
            value: 'starter',
          },
          {
            label: 'Mid-level',
            value: 'mid',
          },
          {
            label: 'Senior',
            value: 'senior',
          },
          {
            label: 'Nightmare',
            value: 'nightmare',
          },
        ],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by difficulty',
          description: 'Tooltip for Difficulty filter for projects list',
          id: 'yptiXw',
        }),
        type: 'checkbox',
      },
      {
        id: 'status',
        label: intl.formatMessage({
          defaultMessage: 'Status',
          description: 'Label for Status filter for projects list',
          id: 'c7eREh',
        }),
        longLabel: intl.formatMessage({
          defaultMessage: 'Challenge status',
          description: 'Label for Status filter for projects list',
          id: 'HCrCHg',
        }),
        options: [
          {
            label: 'Completed',
            value: 'COMPLETED',
          },
          {
            label: 'In progress',
            value: 'IN_PROGRESS',
          },
          {
            label: 'Not started',
            value: 'NOT_STARTED',
          },
        ],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by status',
          description: 'Tooltip for Status filter for projects list',
          id: 'qEo3cR',
        }),
        type: 'checkbox',
      },
    ];

    return filters;
  }, [intl]);
}

type ProjectsChallengeFilterContextType = {
  clearAll: () => void;
  filters: Array<ProjectsChallengeFilter>;
  getArrayTypeSearchParams: (key: string) => Array<string> | undefined;
  getStringTypeSearchParams: (key: string) => string;
  setFilterValue: (
    key: ProjectsChallengeFilterKey,
    value: Array<string>,
  ) => void;
  setSelectedFilters: (
    value: Record<ProjectsChallengeFilterKey, Array<string>>,
  ) => void;
  updateSearchParams: (key: string, value: Array<string> | string) => void;
  value: Record<ProjectsChallengeFilterKey, Array<string>>;
};

export const ProjectsChallengeFilterContext =
  createContext<ProjectsChallengeFilterContextType>({
    clearAll: () => {},
    filters: [],
    getArrayTypeSearchParams: () => [],
    getStringTypeSearchParams: () => '',
    setFilterValue: () => {},
    setSelectedFilters: () => {},
    updateSearchParams: () => {},
    value: {
      'component-track': [],
      difficulty: [],
      skills: [],
      status: [],
    },
  });

export function useProjectsChallengeFilterState(
  key: ProjectsChallengeFilterKey,
) {
  const { value, setFilterValue } = useContext(ProjectsChallengeFilterContext);

  return useMemo(
    () =>
      [
        value[key],
        (newValue: Array<string>) => setFilterValue(key, newValue),
      ] as const,
    [key, setFilterValue, value],
  );
}

export function useProjectsChallengeFilterContext() {
  return useContext(ProjectsChallengeFilterContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsChallengeFilterContextProvider({
  children,
}: Props) {
  const {
    updateSearchParams,
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
  } = useFilterSearchParams();

  const initialComponentTrack = getArrayTypeSearchParams('component-track');
  const initialDifficulty = getArrayTypeSearchParams('difficulty');
  const initialStatus = getArrayTypeSearchParams('status');
  const initialSkills = getArrayTypeSearchParams('skills');
  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsChallengeFilterKey, Array<string>>
  >({
    'component-track': initialComponentTrack ?? [],
    difficulty: initialDifficulty ?? [],
    skills: initialSkills ?? [],
    status: initialStatus ?? [],
  });

  const filters = useFilters();

  const setFilterValue = useCallback(
    (key: ProjectsChallengeFilterKey, value: Array<string>) => {
      // Update search params in the current url
      updateSearchParams(key, value);
      // Reset page number on URL when query changes
      updateSearchParams('page', '1');
      setSelectedFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [updateSearchParams],
  );

  const clearAll = useCallback(() => {
    setSelectedFilters({
      'component-track': [],
      difficulty: [],
      skills: [],
      status: [],
    });
  }, []);

  const value = useMemo(() => {
    return {
      clearAll,
      filters,
      getArrayTypeSearchParams,
      getStringTypeSearchParams,
      setFilterValue,
      setSelectedFilters,
      updateSearchParams,
      value: selectedFilters,
    };
  }, [
    filters,
    clearAll,
    selectedFilters,
    setFilterValue,
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
    updateSearchParams,
  ]);

  return (
    <ProjectsChallengeFilterContext.Provider value={value}>
      {children}
    </ProjectsChallengeFilterContext.Provider>
  );
}
