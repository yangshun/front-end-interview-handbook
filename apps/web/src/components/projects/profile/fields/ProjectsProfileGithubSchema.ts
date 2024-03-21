import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const GITHUB_USERNAME_REGEX = /^[a-zA-Z0-9-]+$/;
const GITHUB_URL_REGEX = /^(?:https?:\/\/)?github\.com\/([a-zA-Z0-9-]+)$/;
const MIN_LENGTH = 2;

function gitHubUsernameSchema(options?: {
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
        return GITHUB_USERNAME_REGEX.test(value);
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

function gitHubUrlSchema(options?: {
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
        return GITHUB_URL_REGEX.test(value);
      },
      {
        message: invalidMessage,
      },
    )
    .transform((url) => {
      const match = url.match(GITHUB_URL_REGEX);

      return match ? match[1] : url;
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

export function getProjectsProfileGitHubAttrs(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'GitHub username',
    description: 'GitHub profile form label',
    id: 'p9IQRJ',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'johndoe',
    description: 'GitHub profile form placeholder',
    id: 'okx37l',
  });
  const description = intl.formatMessage({
    defaultMessage: 'Add your socials so that others can find you!',
    description:
      'Description for social link input on Projects profile onboarding page',
    id: 'SbE8XR',
  });
  const invalidMessage = intl.formatMessage({
    defaultMessage: 'Invalid Github username or URL',
    description: 'Error message when github username or url is invalid',
    id: 'jTKrPE',
  });
  const minMessage = intl.formatMessage({
    defaultMessage: 'Must be two characters or more',
    description: 'Error message for min length',
    id: 'KJ2yNC',
  });

  return {
    description,
    label,
    placeholder,
    validation: {
      invalidMessage,
      minMessage,
      required: false,
    },
  };
}

const invalidMessage = 'Invalid Github username or URL';
const minMessage = 'Must be two characters or more';

export const useProjectsProfileGitHubSchemaServer = z.union([
  gitHubUsernameSchema({
    invalidMessage,
    minMessage,
    required: false,
  }),
  gitHubUrlSchema({
    invalidMessage,
    minMessage,
    required: false,
  }),
]);

export function useProjectsProfileGitHubSchema() {
  const intl = useIntl();
  const intlStrings = getProjectsProfileGitHubAttrs(intl);

  return z.union([
    gitHubUsernameSchema({
      invalidMessage: intlStrings.validation.invalidMessage,
      minMessage: intlStrings.validation.minMessage,
      required: intlStrings.validation.required,
    }),
    gitHubUrlSchema({
      invalidMessage: intlStrings.validation.invalidMessage,
      minMessage: intlStrings.validation.minMessage,
      required: intlStrings.validation.required,
    }),
  ]);
}
