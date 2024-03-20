import { allProjectsTrackMetadata } from 'contentlayer/generated';
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useIntl } from 'react-intl';

import useFilterSearchParams from '~/hooks/useFilterSearchParams';

import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';

export type ProjectsChallengeSubmissionFilterType =
  | 'checkbox'
  | 'skill-selection'
  | 'tech-stack-selection';

export type ProjectsChallengeSubmissionFilterViewType = 'both' | 'slideout';
export type ProjectsChallengeSubmissionFilter = {
  id: ProjectsChallengeSubmissionFilterKey;
  label: string;
  longLabel?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  tooltip?: string;
  type: ProjectsChallengeSubmissionFilterType;
  view: ProjectsChallengeSubmissionFilterViewType;
};

export type ProjectsChallengeSubmissionFilterKey =
  | 'component-track'
  | 'difficulty'
  | 'experience'
  | 'roadmap-skills'
  | 'status'
  | 'tech-stack-skills';

function useFilters() {
  const intl = useIntl();
  const { yoeReplacementOptions: experienceOptions } =
    useProjectsYOEReplacementOptions();

  return useMemo(() => {
    const filters: Array<ProjectsChallengeSubmissionFilter> = [
      {
        id: 'status',
        label: intl.formatMessage({
          defaultMessage: 'Challenge status',
          description: 'Label for Status filter for submissions list',
          id: 'ofUX5S',
        }),
        options: [
          {
            label: 'Completed',
            value: 'COMPLETED',
          },
          {
            label: 'In Progress',
            value: 'IN_PROGRESS',
          },
          {
            label: 'Not Started',
            value: 'NOT_STARTED',
          },
        ],
        tooltip: intl.formatMessage({
          defaultMessage:
            'Filter user submissions by whether you have completed their corresponding challenges',
          description: 'Tooltip for Status filter for projects list',
          id: 'eC4GRM',
        }),
        type: 'checkbox',
        view: 'both',
      },
      {
        id: 'component-track',
        label: intl.formatMessage({
          defaultMessage: 'Component track',
          description: 'Label for Component Track filter for submissions list',
          id: 'cotxax',
        }),
        options: allProjectsTrackMetadata.map((trackMetadata) => ({
          label: trackMetadata.title,
          value: trackMetadata.slug,
        })),
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by component track of original project brief',
          description:
            'Tooltip for Component track filter for submissions list',
          id: '9Ftt1s',
        }),
        type: 'checkbox',
        view: 'slideout',
      },
      {
        id: 'difficulty',
        label: intl.formatMessage({
          defaultMessage: 'Challenge difficulty',
          description: 'Label for Difficulty filter for submissions list',
          id: 'BfJL2V',
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
          defaultMessage: 'Filter by Difficulty of the original project brief',
          description: 'Tooltip for Difficulty filter for submissions list',
          id: 'P9nVrb',
        }),
        type: 'checkbox',
        view: 'both',
      },
      {
        id: 'tech-stack-skills',
        label: intl.formatMessage({
          defaultMessage: 'Tech stack used',
          description: 'Label for "Tech stack used" text input',
          id: 'n2GSsV',
        }),
        options: [],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by stack used by the creator',
          description: 'Label for tech stack filter',
          id: 'OCk0lu',
        }),
        type: 'tech-stack-selection',
        view: 'slideout',
      },
      {
        id: 'roadmap-skills',
        label: intl.formatMessage({
          defaultMessage: 'Skills used',
          description: 'Label for "Skills used" text input',
          id: 'Od0Qjl',
        }),
        options: [],
        tooltip: intl.formatMessage({
          defaultMessage: 'Filter by roadmap skills used by the creator',
          description: 'Label for skills filter',
          id: 'bj6RGb',
        }),
        type: 'skill-selection',
        view: 'slideout',
      },
      {
        id: 'experience',
        label: intl.formatMessage({
          defaultMessage: "Creator's YOE",
          description: 'Label for experience filter for submissions list',
          id: 'jtnskJ',
        }),
        longLabel: intl.formatMessage({
          defaultMessage: 'YOE / Job status',
          description: 'Label for experience filter for submissions list',
          id: '1lAgj0',
        }),
        options: [
          {
            label: 'Junior (1-2)',
            value: 'junior',
          },
          {
            label: 'Mid-level (3-5)',
            value: 'mid',
          },
          {
            label: 'Senior (>6)',
            value: 'senior',
          },
          ...experienceOptions,
        ],
        tooltip: intl.formatMessage({
          defaultMessage:
            'Filter by the creator’s years of experience or their job status',
          description: 'Tooltip for experience filter for submissions list',
          id: 'U17xuY',
        }),
        type: 'checkbox',
        view: 'both',
      },
    ];

    return filters;
  }, [intl, experienceOptions]);
}

type ProjectsChallengeSubmissionFilterContextType = Readonly<{
  clearAll: () => void;
  filters: Array<ProjectsChallengeSubmissionFilter>;
  getArrayTypeSearchParams: (key: string) => Array<string> | undefined;
  getStringTypeSearchParams: (key: string) => string | null;
  setFilterValue: (
    key: ProjectsChallengeSubmissionFilterKey,
    value: Array<string>,
  ) => void;
  setSelectedFilters: (
    value: Record<ProjectsChallengeSubmissionFilterKey, Array<string>>,
  ) => void;
  updateSearchParams: (key: string, value: Array<string> | string) => void;
  value: Record<ProjectsChallengeSubmissionFilterKey, Array<string>>;
}>;

export const ProjectsChallengeSubmissionFilterContext =
  createContext<ProjectsChallengeSubmissionFilterContextType>({
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
      experience: [],
      'roadmap-skills': [],
      status: [],
      'tech-stack-skills': [],
    },
  });

export function useProjectsChallengeSubmissionFilterState(
  key: ProjectsChallengeSubmissionFilterKey,
) {
  const { value, setFilterValue } = useContext(
    ProjectsChallengeSubmissionFilterContext,
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

export function useProjectsChallengeSubmissionFilterContext() {
  return useContext(ProjectsChallengeSubmissionFilterContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsChallengeSubmissionFilterContextProvider({
  children,
}: Props) {
  const {
    updateSearchParams,
    getArrayTypeSearchParams,
    getStringTypeSearchParams,
    updateMultipleSearchParams,
  } = useFilterSearchParams();

  const initialComponentTrack = getArrayTypeSearchParams('component-track');
  const initialExperience = getArrayTypeSearchParams('experience');
  const initialDifficulty = getArrayTypeSearchParams('difficulty');
  const initialStatus = getArrayTypeSearchParams('status');
  const initialRoadmapSkills = getArrayTypeSearchParams('roadmap');
  const initialTechStackSkills = getArrayTypeSearchParams('tech-stack');

  const [selectedFilters, setSelectedFilters] = useState<
    Record<ProjectsChallengeSubmissionFilterKey, Array<string>>
  >({
    'component-track': initialComponentTrack ?? [],
    difficulty: initialDifficulty ?? [],
    experience: initialExperience ?? [],
    'roadmap-skills': initialRoadmapSkills ?? [],
    status: initialStatus ?? [],
    'tech-stack-skills': initialTechStackSkills ?? [],
  });

  const filters = useFilters();

  useEffect(() => {
    // Update search params in the current url
    updateMultipleSearchParams(selectedFilters);
  }, [selectedFilters, updateMultipleSearchParams]);

  const setFilterValue = useCallback(
    (key: ProjectsChallengeSubmissionFilterKey, value: Array<string>) => {
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
      experience: [],
      'roadmap-skills': [],
      status: [],
      'tech-stack-skills': [],
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
    updateSearchParams,
    getStringTypeSearchParams,
    getArrayTypeSearchParams,
  ]);

  return (
    <ProjectsChallengeSubmissionFilterContext.Provider value={value}>
      {children}
    </ProjectsChallengeSubmissionFilterContext.Provider>
  );
}
