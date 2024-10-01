import { z } from 'zod';

import { useIntl } from '~/components/intl';

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
  const requiredMessage = intl.formatMessage({
    defaultMessage: 'Work start date is required',
    description: 'Required Error message for work start date',
    id: 'ex2n84',
  });

  return z
    .string()
    .min(isRequired ? 1 : 0, { message: requiredMessage })
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

        return monthInt >= 1 && monthInt <= 12 && year.length === 4;
      },
      {
        message: intl.formatMessage({
          defaultMessage: 'Please enter a valid date in the format MM/YYYY',
          description:
            'Error message for invalid "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
          id: 'zAyLSU',
        }),
      },
    )
    .refine(
      (value) => {
        const [, year] = value.split('/');
        const yearInt = parseInt(year, 10);

        return yearInt >= 1900;
      },
      {
        message: intl.formatMessage({
          defaultMessage:
            'This date is too long ago to be possible. Please recheck your selections',
          description:
            'Error message for invalid "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
          id: 'hJp3H7',
        }),
      },
    )
    .refine(
      (value) => {
        const [month, year] = value.split('/');
        const yearInt = parseInt(year, 10);
        const monthInt = parseInt(month, 10);
        const currentYear = new Date().getFullYear();
        const currentMonth = new Date().getMonth();

        // Need to add +1 to current month as getMonth is ) based and return 0 for January
        if (monthInt > currentMonth + 1) {
          return yearInt < currentYear;
        }

        return yearInt <= currentYear;
      },
      {
        message: intl.formatMessage({
          defaultMessage:
            'Work start date cannot be in the future. Please recheck your selections',
          description:
            'Error message for invalid "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
          id: 'tbIHno',
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
