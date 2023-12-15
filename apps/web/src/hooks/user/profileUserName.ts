import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MINIMUM_LENGTH = 1;
const MAXIMUM_LENGTH = 48;

/*
Begin with an alphanumeric character followed by more alphanumeric characters or dashes and ending with an alphanumeric character.
Lowercase is not necessary since I added a case-insensitive unique index.
*/
export function getProfileUserNameSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { minMessage, maxMessage } = options ?? {};

  return z
    .string()
    .min(MINIMUM_LENGTH, { message: minMessage })
    .max(MAXIMUM_LENGTH, { message: maxMessage })
    .trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const profileUserNameSchemaServer = getProfileUserNameSchema({
  maxMessage: `Username must contain at most ${MAXIMUM_LENGTH} characters.`,
  minMessage: 'Username cannot be empty.',
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
    successMessage,
  };
}

export function useProfileUserNameSchema() {
  const intl = useIntl();
  const intlStrings = getProfileUserNameStrings(intl);

  return getProfileUserNameSchema({
    maxMessage: intlStrings.maxMessage,
    minMessage: intlStrings.minMessage,
  });
}
