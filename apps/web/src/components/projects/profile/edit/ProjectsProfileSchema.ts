import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import useProjectsMonthYearExperienceSchema from '~/components/projects/hooks/useProjectsMonthYearExperienceSchema';
import { yoeReplacementSchema } from '~/components/projects/misc';

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
          defaultMessage: 'Job title cannot be empty.',
          description: 'Error message',
          id: 'z37jan',
        })
      : intl.formatMessage({
          defaultMessage: 'Title cannot be empty.',
          description: 'Error message',
          id: 'EGeNHT',
        });

  return {
    validation: {
      minMessage,
      required,
    },
  };
}

export const projectsJobTitleInputSchemaServer = projectsJobTitleInputSchema({
  minMessage: 'Job title cannot be empty.',
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
  };
}

export function useProjectsJobNotStartedSchema() {
  const intl = useIntl();
  const monthYearExperienceSchema = useProjectsMonthYearExperienceSchema({
    isRequired: true,
  });
  const titleSchema = useProjectsJobTitleInputSchema({ type: 'title' });

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
    monthYearExperience: monthYearExperienceSchema
      .optional()
      .transform(() => null),
    title: titleSchema,
    yoeReplacement: z
      .discriminatedUnion('option', [
        z.object({
          option: yoeReplacementSchema.extract(['others']),
          otherText: z.string().min(1, {
            message: intl.formatMessage({
              defaultMessage: 'Please enter your status',
              description:
                'Error message for empty "Other" input for "Years of experience replacement status" on Projects profile page',
              id: '4rcZT1',
            }),
          }),
        }),
        z.object({
          option: yoeReplacementSchema.exclude(['others']),
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
