import { useIntl } from 'react-intl';
import { z } from 'zod';

import { motivationReasonValue } from '~/components/projects/misc';

type Props =
  | Readonly<{
      isRequired?: boolean;
    }>
  | undefined;

export default function useProjectsMotivationReasonSchema(options: Props = {}) {
  const intl = useIntl();
  const { isRequired = true } = options;

  const motivationSchema = z.union([
    z
      .object({
        otherValue: z.string(),
        type: motivationReasonValue.exclude(['other']).nullable(),
      })
      .transform(({ type }) => type),
    z
      .object({
        otherValue: z.string().min(1, {
          message: intl.formatMessage({
            defaultMessage: 'Please enter your motivations',
            description:
              'Error message for empty "Other" onboarding option in Projects',
            id: 'zACRRV',
          }),
        }),
        type: motivationReasonValue.extract(['other']),
      })
      .transform(({ otherValue }) => otherValue),
  ]);

  return z.object({
    primary: isRequired
      ? motivationSchema.transform((motivation) =>
          motivation === null ? z.NEVER : motivation,
        )
      : motivationSchema,
    secondary: motivationSchema,
  });
}
