import type { z } from 'zod';

import type {
  motivationReasonValue,
  yoeReplacementSchema,
} from '~/components/projects/misc';

export type ProjectsMotivationReasonType = 'primary' | 'secondary';

export type ProjectsMotivationReasonValue = z.infer<
  typeof motivationReasonValue
>;

export type ProjectsMotivationReasonOption = Readonly<{
  content: React.ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: ProjectsMotivationReasonValue;
  label: string;
}>;

export type ProjectsMotivationReasonFormValues = Record<
  ProjectsMotivationReasonType,
  {
    otherValue: string;
    type: ProjectsMotivationReasonValue | null;
  }
>;

// TODO(projects): generalize this field.
export type ProjectsYoeReplacement = z.infer<typeof yoeReplacementSchema>;

export type ProjectsEditProfileValues = {
  avatarUrl?: string;
  bio: string;
  githubUsername: string;
  hasNotStartedWork: boolean;
  jobTitle: string;
  linkedInUsername: string;
  monthYearExperience: string | undefined;
  motivationReasons: ProjectsMotivationReasonFormValues;
  name: string;
  techStackProficient: string;
  techStackToImprove: string;
  website: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
};

export type ProjectsOnboardingProfileStep1Values = {
  hasNotStartedWork: boolean;
  jobTitle: string;
  monthYearExperience: string | undefined;
  name: string;
  techStackProficient: string;
  techStackToImprove: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
};

export type ProjectsSortField =
  | 'completedCount'
  | 'createdAt'
  | 'difficulty'
  | 'recommended';

export type ProjectsChallengesDifficulty =
  | 'mid'
  | 'nightmare'
  | 'senior'
  | 'starter';

export type ProjectsRecommendedAction = {
  cta: string;
  description: string;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  title: string;
};

export type ProjectsProfileAvatarData = ProjectsProfileAvatarDataSlim &
  Readonly<{
    points: number;
  }>;

export type ProjectsProfileAvatarDataSlim = Readonly<{
  avatarUrl: string | null;
  id: string;
  name: string | null;
  username: string;
}>;

export type ProjectsSkillItem = Readonly<{
  completedChallenges: number;
  points: number;
  title: string;
  totalChallenges: number;
}>;

export type ProjectsSkillFamily = ProjectsSkillItem &
  Readonly<{
    childSkills: ReadonlyArray<ProjectsSkillItem>;
    description: string;
  }>;
