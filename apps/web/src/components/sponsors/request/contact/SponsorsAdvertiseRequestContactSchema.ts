import { z } from 'zod';

import { useIntl } from '~/components/intl';

function emailsSchema(options?: {
  invalidMessage?: string;
  minMessage?: string;
}) {
  const { invalidMessage, minMessage } = options ?? {};

  return z
    .array(
      z.object({
        value: z
          .string()
          .trim()
          .refine(
            (val) => val === '' || z.string().email().safeParse(val).success,
            {
              message: invalidMessage,
            },
          ),
      }),
    )
    .refine(
      (emails) =>
        emails.some(
          (email) =>
            email.value.trim() !== '' &&
            z.string().email().safeParse(email.value).success,
        ),
      { message: minMessage || 'At least one valid email is required' },
    );
}

export function useSponsorsAdvertiseRequestEmailsSchema() {
  const intl = useIntl();

  return emailsSchema({
    invalidMessage: intl.formatMessage({
      defaultMessage: 'Invalid email address',
      description: 'Error message for invalid email address',
      id: 'jXX7Jw',
    }),
    minMessage: intl.formatMessage({
      defaultMessage: 'At least one email is required',
      description: 'Error message for min length',
      id: 'lBK7ry',
    }),
  });
}

export function useSponsorsAdvertiseRequestContactSchema() {
  return z.object({
    emails: useSponsorsAdvertiseRequestEmailsSchema(),
  });
}
