import type { IntlShape } from 'react-intl';
import { z } from 'zod';

import { useIntl } from '~/components/intl';
import useProjectsMonthYearExperienceSchema from '~/components/projects/hooks/useProjectsMonthYearExperienceSchema';
import { yoeReplacementSchema } from '~/components/projects/misc';

const MIN_LENGTH = 1;
const MAX_LENGTH = 80;

function projectsJobTitleInputSchema(options?: {
  minMessage?: string;
  required?: boolean;
}) {
  const { minMessage, required = true } = options ?? {};

  return z.string().min(required ? 1 : 0, { message: minMessage });
}

type Title = 'jobTitle' | 'title';

function getProjectsJobTitleAttributes(
  intl: IntlShape,
  required = true,
  type: Title,
) {
  const minMessage =
    type === 'jobTitle'
      ? intl.formatMessage({
          defaultMessage: 'Job title is required.',
          description: 'Error message',
          id: 'p3mRa0',
        })
      : intl.formatMessage({
          defaultMessage: 'Title is required.',
          description: 'Error message',
          id: 'baT4cM',
        });

  return {
    validation: {
      minMessage,
      required,
    },
  };
}

export const projectsJobTitleInputSchemaServer = projectsJobTitleInputSchema({
  minMessage: 'Job title is required.',
});

export function useProjectsJobTitleInputSchema({
  required = true,
  type = 'jobTitle',
}: {
  required?: boolean;
  type?: Title;
} = {}) {
  const intl = useIntl();
  const intlStrings = getProjectsJobTitleAttributes(intl, required, type);

  return projectsJobTitleInputSchema({
    minMessage: intlStrings.validation.minMessage,
    required,
  });
}

export function useProjectsJobStartedSchema() {
  const monthYearExperienceSchema = useProjectsMonthYearExperienceSchema({
    isRequired: true,
  });
  const jobTitleSchema = useProjectsJobTitleInputSchema({ type: 'jobTitle' });

  return {
    company: z.string().optional(),
    hasStartedWork: z.literal(true),
    jobTitle: jobTitleSchema,
    monthYearExperience: monthYearExperienceSchema,
    title: z
      .string()
      .optional()
      .transform(() => undefined),
    yoeReplacement: z
      .discriminatedUnion('option', [
        z.object({
          option: yoeReplacementSchema.extract(['others']),
          otherText: z.string().trim(),
        }),
        z.object({
          option: yoeReplacementSchema.exclude(['others']),
          otherText: z.string().optional(),
        }),
      ])
      .optional()
      .transform(() => null),
  };
}

export function getProjectsProfileJobStatusOthersFieldAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Other',
    description:
      'Label for other input for yoe replacement status on projects profile page',
    id: 'NXw886',
  });

  const placeholder = intl.formatMessage({
    defaultMessage: 'Write your status here',
    description:
      'Placeholder for status others field on project profile edit page',
    id: 'SK7Xn6',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage: 'Status must contain at most {maxLength} character(s).',
      description:
        'Error message for exceed char limit in other input for yoe status on projects profile page',
      id: 'oWznNz',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage({
    defaultMessage: 'Please enter your status',
    description:
      'Error message for empty other input for yoe status on projects profile page',
    id: 'anZw89',
  });

  return {
    label,
    placeholder,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minMessage,
    },
  };
}

export function useProjectsJobNotStartedSchema() {
  const intl = useIntl();
  const titleSchema = useProjectsJobTitleInputSchema({ type: 'title' });
  const intlStrings = getProjectsProfileJobStatusOthersFieldAttributes(intl);

  return {
    company: z
      .string()
      .optional()
      .transform(() => null),
    hasStartedWork: z.literal(false),
    jobTitle: z
      .string()
      .optional()
      .transform(() => undefined),
    monthYearExperience: z
      .string()
      .optional()
      .transform(() => null),
    title: titleSchema,
    yoeReplacement: z
      .discriminatedUnion('option', [
        z.object({
          option: yoeReplacementSchema.extract(['others']),
          otherText: z
            .string()
            .min(MIN_LENGTH, { message: intlStrings.validation.minMessage })
            .max(MAX_LENGTH, { message: intlStrings.validation.maxMessage })
            .trim(),
        }),
        z.object({
          option: yoeReplacementSchema.exclude(['others']),
          otherText: z.string().optional(),
        }),
      ])
      .transform((value) => {
        if (value.option === 'others') {
          return value.otherText;
        }

        return value.option;
      }),
  };
}
