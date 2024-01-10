import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

export type ProjectsChallengeFilterType = 'checkbox' | 'skill-selection';
export type ProjectsChallengeFilter = {
  id: ProjectsChallengeFilterKey;
  label: string;
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
        options: [
          {
            label: 'Design system track',
            value: 'design-system-track',
          },
          {
            label: 'Marketing track',
            value: 'marketing-track',
          },
        ],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by component track',
          description: 'Tooltip for Component track filter for projects list',
          id: '03TVln',
        }),
        type: 'checkbox',
      },
      {
        id: 'difficulty',
        label: intl.formatMessage({
          defaultMessage: 'Difficulty',
          description: 'Label for Difficulty filter for projects list',
          id: 'qRBY3O',
        }),
        options: [
          {
            label: 'Starter',
            value: 'starter',
          },
          {
            label: 'Intermediate',
            value: 'intermediate',
          },
          {
            label: 'Advanced',
            value: 'advanced',
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
        id: 'skills',
        label: intl.formatMessage({
          defaultMessage: 'Skills',
          description: 'Label for Skills filter for projects list',
          id: 'wzV6ho',
        }),
        options: [],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by skills',
          description: 'Tooltip for Skills filter for projects list',
          id: 'KBkMan',
        }),
        type: 'skill-selection',
      },
      {
        id: 'status',
        label: intl.formatMessage({
          defaultMessage: 'Status',
          description: 'Label for Status filter for projects list',
          id: 'c7eREh',
        }),
        options: [],
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
  setFilterValue: (
    key: ProjectsChallengeFilterKey,
    value: Array<string>,
  ) => void;
  setSelectedFilters: (
    value: Record<ProjectsChallengeFilterKey, Array<string>>,
  ) => void;
  value: Record<ProjectsChallengeFilterKey, Array<string>>;
};

export const ProjectsChallengeFilterContext =
  createContext<ProjectsChallengeFilterContextType>({
    clearAll: () => {},
    filters: [],
    setFilterValue: () => {},
    setSelectedFilters: () => {},
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
  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsChallengeFilterKey, Array<string>>
  >({
    'component-track': [],
    difficulty: [],
    skills: [],
    status: [],
  });

  const filters = useFilters();

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
      filters,
      setFilterValue,
      setSelectedFilters,
      value: selectedFilters,
    };
  }, [filters, clearAll, selectedFilters, setFilterValue]);

  return (
    <ProjectsChallengeFilterContext.Provider value={value}>
      {children}
    </ProjectsChallengeFilterContext.Provider>
  );
}
