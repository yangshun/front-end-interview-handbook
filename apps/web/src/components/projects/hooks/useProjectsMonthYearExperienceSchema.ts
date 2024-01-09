import { useIntl } from 'react-intl';
import { z } from 'zod';

type Props =
  | Readonly<{
      isRequired?: boolean;
    }>
  | undefined;

export default function useProjectsMonthYearExperienceSchema(
  options: Props = {},
) {
  const intl = useIntl();
  const { isRequired = true } = options;

  return z
    .string()
    .refine(
      (value) => {
        if (!value && !isRequired) {
          return true;
        }

        const [month, year] = value.split('/');

        if (!month || !year) {
          return false;
        }

        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);

        return monthInt >= 1 && monthInt <= 12 && yearInt >= 1900;
      },
      {
        message: intl.formatMessage({
          defaultMessage: 'Please enter a valid date',
          description:
            'Error message for invalid "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
          id: '3QQssQ',
        }),
      },
    )
    .transform((value) => {
      if (!value && !isRequired) {
        return undefined;
      }

      const [month, year] = value.split('/');

      return new Date(parseInt(year, 10), parseInt(month, 10) - 1);
    });
}
