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
import useProjectsYOEReplacementOptions from '~/components/projects/hooks/useProjectsYOEReplacementOptions';
import type { ProjectsTrackItem } from '~/components/projects/tracks/data/ProjectsTracksData';

export type ProjectsChallengeSubmissionFilterType =
  | 'checkbox'
  | 'skill-selection'
  | 'tech-stack-selection';

export type ProjectsChallengeSubmissionFilterViewType = 'both' | 'slideout';
export type ProjectsChallengeSubmissionFilterOption = Readonly<{
  id: ProjectsChallengeSubmissionFilterKey;
  label: string;
  longLabel?: string;
  options: Array<{
    label: string;
    value: string;
  }>;
  premium: boolean;
  tooltip?: string;
  type: ProjectsChallengeSubmissionFilterType;
  view: ProjectsChallengeSubmissionFilterViewType;
}>;

export type ProjectsChallengeSubmissionFilterKey =
  | 'component-track'
  | 'difficulty'
  | 'experience'
  | 'roadmap-skills'
  | 'status'
  | 'tech-stack-skills';

function useFilterOptions(tracks: ReadonlyArray<ProjectsTrackItem>) {
  const intl = useIntl();
  const { yoeReplacementOptions: experienceOptions } =
    useProjectsYOEReplacementOptions();

  return useMemo(() => {
    const filters: Array<ProjectsChallengeSubmissionFilterOption> = [
      {
        id: 'status',
        label: intl.formatMessage({
          defaultMessage: 'Challenge status',
          description: 'Label for Status filter for submissions list',
          id: 'ofUX5S',
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
              defaultMessage: 'In Progress',
              description: 'Challenge completion label',
              id: '3M5CDz',
            }),
            value: 'IN_PROGRESS',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Not Started',
              description: 'Challenge completion label',
              id: 'R/tHnD',
            }),
            value: 'NOT_STARTED',
          },
        ],
        premium: false,
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
        options: tracks.map((trackItem) => ({
          label: trackItem.info.title,
          value: trackItem.metadata.slug,
        })),
        premium: true,
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
        premium: false,
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
        premium: false,
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
            label: intl.formatMessage({
              defaultMessage: 'Junior (1-2)',
              description: 'Job experience label',
              id: 'cOS90R',
            }),
            value: 'junior',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Mid-level (3-5)',
              description: 'Job experience label',
              id: 'l3/UIe',
            }),
            value: 'mid',
          },
          {
            label: intl.formatMessage({
              defaultMessage: 'Senior (>6)',
              description: 'Job experience label',
              id: 'b59DYW',
            }),
            value: 'senior',
          },
          ...experienceOptions,
        ],
        premium: false,
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
  }, [intl, tracks, experienceOptions]);
}

type ProjectsChallengeSubmissionFilterContextType = Readonly<{
  clearAll: () => void;
  filters: Array<ProjectsChallengeSubmissionFilterOption>;
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
  const { setFilterValue, value } = useContext(
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
  tracks: ReadonlyArray<ProjectsTrackItem>;
}>;

export default function ProjectsChallengeSubmissionFilterContextProvider({
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

  const filterOptions = useFilterOptions(tracks);

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
      filters: filterOptions,
      getArrayTypeSearchParams,
      getStringTypeSearchParams,
      setFilterValue,
      setSelectedFilters,
      updateSearchParams,
      value: selectedFilters,
    };
  }, [
    filterOptions,
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
