import { z } from 'zod';

import { useIntl } from '~/components/intl';
import { motivationReasonValue } from '~/components/projects/misc';

import type {
  ProjectsMotivationReasonFormChoice,
  ProjectsMotivationReasonValue,
} from '../types';

type Props =
  | Readonly<{
      isRequired?: boolean;
    }>
  | undefined;

export const MOTIVATION_OTHER_REASON_CHAR_LIMIT = 80;

export function convertProjectsMotivationReasonToFormValue(
  values: Array<string>,
): Array<ProjectsMotivationReasonFormChoice> {
  const formChoices: Array<ProjectsMotivationReasonFormChoice> = [];

  values.forEach((reasonValue) => {
    const value = reasonValue as ProjectsMotivationReasonValue;

    if (motivationReasonValue.enum[value] && value !== 'other') {
      formChoices.push({ value });

      return;
    }

    formChoices.push({
      otherValue: value,
      value: 'other',
    });
  });

  return formChoices;
}

export default function useProjectsMotivationReasonSchema(options: Props = {}) {
  const intl = useIntl();
  const { isRequired = true } = options;

  const motivationSchema = z.union([
    z
      .object({
        value: motivationReasonValue.exclude(['other']).nullable(),
      })
      .transform(({ value }) => value),
    z
      .object({
        otherValue: z.string(),
        value: motivationReasonValue.extract(['other']),
      })
      .refine((motivation) => motivation.otherValue.length > 0, {
        message: intl.formatMessage({
          defaultMessage: 'Please enter your motivations',
          description:
            'Error message for empty "Other" onboarding option in Projects',
          id: 'zACRRV',
        }),
      })
      .refine(
        (motivation) =>
          motivation.otherValue.length <= MOTIVATION_OTHER_REASON_CHAR_LIMIT,
        {
          message: intl.formatMessage(
            {
              defaultMessage:
                'Keep your reason to under {characterLimit} characters',
              description: 'String validation message',
              id: 'D7z/wQ',
            },
            {
              characterLimit: MOTIVATION_OTHER_REASON_CHAR_LIMIT,
            },
          ),
        },
      )
      .transform(({ otherValue }) => otherValue),
  ]);

  return z.array(motivationSchema).min(isRequired ? 1 : 0, {
    message: intl.formatMessage({
      defaultMessage: 'Provide at least 1 motivation for joining',
      description: 'Error for motivation selection',
      id: 'VNrtSz',
    }),
  });
}
