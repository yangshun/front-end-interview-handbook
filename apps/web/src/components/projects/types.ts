import type { z } from 'zod';

import type {
  motivationReasonValue,
  yoeReplacementSchema,
} from '~/components/projects/misc';

export type MotivationReasonType = 'primary' | 'secondary';

export type MotivationReasonValue = z.infer<typeof motivationReasonValue>;

export type MotivationReasonOption = {
  content: React.ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: MotivationReasonValue;
  label: string;
};

export type MotivationReasonFormValues = Record<
  MotivationReasonType,
  {
    otherValue: string;
    type: MotivationReasonValue | null;
  }
>;

export type YOEReplacement = z.infer<typeof yoeReplacementSchema>;

export type ProjectsEditProfileValues = {
  avatarUrl?: string;
  bio: string;
  githubUsername: string;
  hasNotStartedWork: boolean;
  jobTitle: string;
  linkedInUsername: string;
  monthYearExperience: string | undefined;
  motivationReasons: MotivationReasonFormValues;
  name: string;
  techStackProficient: string;
  techStackToImprove: string;
  website: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
};

export type OnboardingProfilePage1Values = {
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
