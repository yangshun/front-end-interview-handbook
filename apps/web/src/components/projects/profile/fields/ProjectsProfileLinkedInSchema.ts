import { z } from 'zod';

import type { IntlShape } from '~/components/intl';
import { useIntl } from '~/components/intl';

const LINKEDIN_USERNAME_REGEX = /^[a-zA-Z0-9-_]+$/;
const LINKEDIN_URL_REGEX =
  /^(?:https?:\/\/)?(www\.)?linkedin\.com\/in\/([a-zA-Z0-9-_]+)\/?$/;
const MIN_LENGTH = 2;

function linkedInUsernameSchema(options?: {
  invalidMessage?: string;
  minMessage?: string;
  required?: boolean;
}) {
  const { invalidMessage, minMessage, required = true } = options ?? {};
  const usernameValidation = z
    .string()
    .trim()
    .min(MIN_LENGTH, minMessage)
    .refine(
      (value) => {
        return LINKEDIN_USERNAME_REGEX.test(value);
      },
      {
        message: invalidMessage,
      },
    );

  return required
    ? usernameValidation
    : z.union([
        usernameValidation,
        z
          .literal('')
          .transform(() => null)
          .nullable(),
      ]);
}

function linkedInUrlSchema(options?: {
  invalidMessage?: string;
  minMessage?: string;
  required?: boolean;
}) {
  const { invalidMessage, minMessage, required = true } = options ?? {};

  const urlValidation = z
    .string()
    .trim()
    .min(MIN_LENGTH, minMessage)
    .refine(
      (value) => {
        return LINKEDIN_URL_REGEX.test(value);
      },
      {
        message: invalidMessage,
      },
    )
    .transform((url) => {
      const match = url.match(LINKEDIN_URL_REGEX);

      return match ? match[2] : url;
    });

  return required
    ? urlValidation
    : z.union([
        urlValidation,
        z
          .literal('')
          .transform(() => null)
          .nullable(),
      ]);
}

export function getProjectsProfileLinkedInAttrs(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'LinkedIn username',
    description: 'LinkedIn profile form label',
    id: 'kPaVl6',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'john-doe',
    description: 'LinkedIn profile form placeholder',
    id: 'WQCzd5',
  });
  const invalidMessage = intl.formatMessage({
    defaultMessage: 'Invalid LinkedIn username or URL',
    description: 'Error message when linkedin username or url is invalid',
    id: 'zBgQ/Y',
  });
  const minMessage = intl.formatMessage({
    defaultMessage: 'Must be two characters or more',
    description: 'Error message for min length',
    id: 'KJ2yNC',
  });

  return {
    label,
    placeholder,
    validation: {
      invalidMessage,
      minMessage,
      required: false,
    },
  };
}

const invalidMessage = 'Invalid LinkedIn username or URL';
const minMessage = 'Must be two characters or more';

export const useProjectsProfileLinkedInSchemaServer = z.union([
  linkedInUsernameSchema({
    invalidMessage,
    minMessage,
    required: false,
  }),
  linkedInUrlSchema({
    invalidMessage,
    minMessage,
    required: false,
  }),
]);

export function useProjectsProfileLinkedInSchema() {
  const intl = useIntl();
  const intlStrings = getProjectsProfileLinkedInAttrs(intl);

  return z.union([
    linkedInUsernameSchema({
      invalidMessage: intlStrings.validation.invalidMessage,
      minMessage: intlStrings.validation.minMessage,
      required: intlStrings.validation.required,
    }),
    linkedInUrlSchema({
      invalidMessage: intlStrings.validation.invalidMessage,
      minMessage: intlStrings.validation.minMessage,
      required: intlStrings.validation.required,
    }),
  ]);
}
