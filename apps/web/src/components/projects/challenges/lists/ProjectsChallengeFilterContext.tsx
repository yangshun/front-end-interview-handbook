'use client';

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import { useIntl } from '~/components/intl';
import type { PopoverContentWidth } from '~/components/ui/Popover';

import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';

export type ProjectsChallengeFilterType = 'checkbox' | 'skill-selection';
export type ProjectsChallengeFilterViewType = 'both' | 'slideout';

export type ProjectsChallengeFilterCommon = Readonly<{
  id: ProjectsChallengeFilterKey;
  label: string;
  longLabel?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  premium: boolean;
  tooltip: string;
  type: ProjectsChallengeFilterType;
  view: ProjectsChallengeFilterViewType;
}>;

export type ProjectsChallengeFilterDropdown = ProjectsChallengeFilterCommon & {
  view: 'both';
  width?: PopoverContentWidth;
};

export type ProjectsChallengeFilterOption =
  | ProjectsChallengeFilterDropdown
  | (ProjectsChallengeFilterCommon & {
      view: 'slideout';
    });

export type ProjectsChallengeFilterKey =
  | 'component-track'
  | 'difficulty'
  | 'skills'
  | 'status';

function useFilterOptions(tracks: ReadonlyArray<ProjectsTrackItem>) {
  const intl = useIntl();

  return useMemo(() => {
    const filterOptions: Array<ProjectsChallengeFilterOption> = [
      {
        id: 'component-track',
        label: intl.formatMessage({
          defaultMessage: 'Component track',
          description: 'Label for Component Track filter for projects list',
          id: '+R1wGb',
        }),
        options: tracks.map((trackItem) => ({
          label: trackItem.info.title,
          value: trackItem.metadata.slug,
        })),
        premium: true,
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by component track',
          description: 'Tooltip for Component track filter for projects list',
          id: '03TVln',
        }),
        type: 'checkbox',
        view: 'both',
        width: 'md',
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
        premium: false,
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by skills',
          description: 'Tooltip for Skills filter for projects list',
          id: 'KBkMan',
        }),
        type: 'skill-selection',
        view: 'both',
      },
      {
        id: 'difficulty',
        label: intl.formatMessage({
          defaultMessage: 'Difficulty',
          description: 'Difficulty label',
          id: 'yizEDq',
        }),
        longLabel: intl.formatMessage({
          defaultMessage: 'Challenge difficulty',
          description: 'Label for Difficulty filter for projects list',
          id: 'WETxAT',
        }),
        options: [
          {
            label: intl.formatMessage({
              defaultMessage: 'Starter',
              description: 'Challenge difficulty label',
              id: 'hxe/Fj',
            }),
            value: 'starter',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Mid-level',
              description: 'Challenge difficulty label',
              id: 'fEXu1+',
            }),
            value: 'mid',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Senior',
              description: 'Challenge difficulty label',
              id: 'm5UJIt',
            }),
            value: 'senior',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Nightmare',
              description: 'Challenge difficulty label',
              id: 'z+mEGf',
            }),
            value: 'nightmare',
          },
        ],
        premium: false,
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by difficulty',
          description: 'Tooltip for Difficulty filter for projects list',
          id: 'yptiXw',
        }),
        type: 'checkbox',
        view: 'both',
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
            label: intl.formatMessage({
              defaultMessage: 'Completed',
              description: 'Challenge completion label',
              id: 'RO7rPV',
            }),
            value: 'COMPLETED',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'In progress',
              description: 'Challenge completion label',
              id: 'GZLfaL',
            }),
            value: 'IN_PROGRESS',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Not started',
              description: 'Challenge completion label',
              id: 'gBOX72',
            }),
            value: 'NOT_STARTED',
          },
        ],
        premium: false,
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by status',
          description: 'Tooltip for Status filter for projects list',
          id: 'qEo3cR',
        }),
        type: 'checkbox',
        view: 'both',
      },
    ];

    return filterOptions;
  }, [intl, tracks]);
}

type ProjectsChallengeFilterContextType = Readonly<{
  clearAll: () => void;
  filterItems: Array<ProjectsChallengeFilterOption>;
  getArrayTypeSearchParams: (key: string) => Array<string> | undefined;
  getStringTypeSearchParams: (key: string) => string | null;
  setFilterValue: (
    key: ProjectsChallengeFilterKey,
    value: Array<string>,
  ) => void;
  setSelectedFilters: (
    value: Record<ProjectsChallengeFilterKey, Array<string>>,
  ) => void;
  updateSearchParams: (key: string, value: Array<string> | string) => void;
  value: Record<ProjectsChallengeFilterKey, Array<string>>;
}>;

export const ProjectsChallengeFilterContext =
  createContext<ProjectsChallengeFilterContextType>({
    clearAll: () => {},
    filterItems: [],
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
  const { setFilterValue, value } = useContext(ProjectsChallengeFilterContext);

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
  tracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsChallengeFilterContextProvider({
  children,
  tracks,
}: Props) {
  const {
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
    updateMultipleSearchParams,
    updateSearchParams,
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

  const filterItems = useFilterOptions(tracks);

  useEffect(() => {
    // Update search params in the current url
    updateMultipleSearchParams(selectedFilters);
  }, [selectedFilters, updateMultipleSearchParams]);

  const setFilterValue = useCallback(
    (key: ProjectsChallengeFilterKey, value: Array<string>) => {
      setSelectedFilters((prev) => ({
        ...prev,
        [key]: value,
      }));
    },
    [],
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
      filterItems,
      getArrayTypeSearchParams,
      getStringTypeSearchParams,
      setFilterValue,
      setSelectedFilters,
      updateSearchParams,
      value: selectedFilters,
    };
  }, [
    filterItems,
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
