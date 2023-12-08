import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

export type ProjectsProjectFilterType = 'checkbox' | 'skill-selection';
export type ProjectsProjectFilter = {
  id: ProjectsProjectFilterKey;
  label: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  tooltip: string;
  type: ProjectsProjectFilterType;
};

export type ProjectsProjectFilterKey =
  | 'component-track'
  | 'difficulty'
  | 'skills'
  | 'status';

function useFilters() {
  const intl = useIntl();

  return useMemo(() => {
    const filters: Array<ProjectsProjectFilter> = [
      {
        id: 'component-track',
        label: intl.formatMessage({
          defaultMessage: 'Component Track',
          description: 'Label for Component Track filter for projects list',
          id: '0Lfmy2',
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
          defaultMessage: 'Filter by Component Track',
          description: 'Tooltip for Component track filter for projects list',
          id: 'jDFcsE',
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
          defaultMessage: 'Filter by Difficulty',
          description: 'Tooltip for Difficulty filter for projects list',
          id: 'm/PYOV',
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
          defaultMessage: 'Filter by Skills',
          description: 'Tooltip for Skills filter for projects list',
          id: '84jjDe',
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
          defaultMessage: 'Filter by Status',
          description: 'Tooltip for Status filter for projects list',
          id: '5a8KFD',
        }),
        type: 'checkbox',
      },
    ];

    return filters;
  }, [intl]);
}

type ProjectsProjectFilterContextType = {
  clearAll: () => void;
  filters: Array<ProjectsProjectFilter>;
  setFilterValue: (key: ProjectsProjectFilterKey, value: Array<string>) => void;
  setSelectedFilters: (
    value: Record<ProjectsProjectFilterKey, Array<string>>,
  ) => void;
  value: Record<ProjectsProjectFilterKey, Array<string>>;
};

export const ProjectsProjectFilterContext =
  createContext<ProjectsProjectFilterContextType>({
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

export function useProjectsProjectFilterState(key: ProjectsProjectFilterKey) {
  const { value, setFilterValue } = useContext(ProjectsProjectFilterContext);

  return useMemo(
    () =>
      [
        value[key],
        (newValue: Array<string>) => setFilterValue(key, newValue),
      ] as const,
    [key, setFilterValue, value],
  );
}

export function useProjectsProjectFilterContext() {
  return useContext(ProjectsProjectFilterContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsProjectFilterContextProvider({
  children,
}: Props) {
  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsProjectFilterKey, Array<string>>
  >({
    'component-track': [],
    difficulty: [],
    skills: [],
    status: [],
  });

  const filters = useFilters();

  const setFilterValue = useCallback(
    (key: ProjectsProjectFilterKey, value: Array<string>) => {
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
    <ProjectsProjectFilterContext.Provider value={value}>
      {children}
    </ProjectsProjectFilterContext.Provider>
  );
}
