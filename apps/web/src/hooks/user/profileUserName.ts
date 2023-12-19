import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MINIMUM_LENGTH = 1;
const MAXIMUM_LENGTH = 48;
const REGEX_VALIDATION = new RegExp(/^[a-zA-Z0-9]+([-]*[a-zA-Z0-9]+)*$/);

export function getProfileUserNameSchema(options?: {
  maxMessage: string;
  minMessage: string;
  regexMessage: string;
}) {
  const { minMessage, maxMessage, regexMessage } = options ?? {};

  return z
    .string()
    .min(MINIMUM_LENGTH, { message: minMessage })
    .max(MAXIMUM_LENGTH, { message: maxMessage })
    .regex(REGEX_VALIDATION, { message: regexMessage })
    .trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const profileUserNameSchemaServer = getProfileUserNameSchema({
  maxMessage: `Username must contain at most ${MAXIMUM_LENGTH} characters.`,
  minMessage: 'Username cannot be empty.',
  regexMessage: 'Username should begin and end with an alphanumeric character, and only contain alphanumeric characters or dashes.',
});

export function getProfileUserNameStrings(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Username',
    description: 'Username',
    id: 'Ooddpj',
  });
  const description = intl.formatMessage(
    {
      defaultMessage:
        'This is the unique username used to identify you. Use a maximum of {maxLength} characters.',
      description: 'Username field description',
      id: 'JIywgW',
    },
    {
      maxLength: MAXIMUM_LENGTH,
    },
  );
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Username must contain at most {maxLength} characters.',
      description: 'Error message when username is too long',
      id: 'Wi3vIz',
    },
    {
      maxLength: MAXIMUM_LENGTH,
    },
  );
  const minMessage = intl.formatMessage({
    defaultMessage: 'Username cannot be empty.',
    description: 'Error message when username is too short',
    id: 'iF3wN+',
  });
  const regexMessage = intl.formatMessage({
    defaultMessage: 'Username should begin and end with an alphanumeric character, and only contain alphanumeric characters or dashes.',
    description: 'Error message when username contains invalid characters',
    id: '/95uM9',
  });
  const successMessage = intl.formatMessage({
    defaultMessage: 'Your username has been updated.',
    description: 'Success message when for username changes',
    id: '+5baZ1',
  });

  return {
    description,
    label,
    maxMessage,
    minMessage,
    regexMessage,
    successMessage,
  };
}

export function useProfileUserNameSchema() {
  const intl = useIntl();
  const intlStrings = getProfileUserNameStrings(intl);

  return getProfileUserNameSchema({
    maxMessage: intlStrings.maxMessage,
    minMessage: intlStrings.minMessage,
    regexMessage: intlStrings.regexMessage,
  });
}
