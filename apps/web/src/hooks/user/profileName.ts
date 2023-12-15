import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MAXIMUM_LENGTH = 32;

export function getProfileNameSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { minMessage, maxMessage } = options ?? {};

  return z
    .string()
    .min(1, { message: minMessage })
    .max(MAXIMUM_LENGTH, { message: maxMessage })
    .trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const profileNameSchemaServer = getProfileNameSchema({
  maxMessage: `Display name must contain at most ${MAXIMUM_LENGTH} characters.`,
  minMessage: 'Display name cannot be empty.',
});

export function getProfileNameStrings(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Display name',
    description: 'Display name',
    id: 'iIuSTk',
  });
  const description = intl.formatMessage(
    {
      defaultMessage:
        'This is the name that will be shown on your profile. Use a maximum of {maxLength} characters.',
      description: 'Name field description',
      id: 'nfWiNn',
    },
    {
      maxLength: MAXIMUM_LENGTH,
    },
  );
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Display name must contain at most {maxLength} characters.',
      description: 'Error message when display name is too long',
      id: 'v9aMaT',
    },
    {
      maxLength: MAXIMUM_LENGTH,
    },
  );
  const minMessage = intl.formatMessage({
    defaultMessage: 'Display name cannot be empty.',
    description: 'Error message when display name is too short',
    id: 'WHx4gl',
  });
  const successMessage = intl.formatMessage({
    defaultMessage: 'Your display name has been updated.',
    description: 'Success message when for name change',
    id: 'LyLGTu',
  });

  return {
    description,
    label,
    maxMessage,
    minMessage,
    successMessage,
  };
}

export function useProfileNameSchema() {
  const intl = useIntl();
  const intlStrings = getProfileNameStrings(intl);

  return getProfileNameSchema({
    maxMessage: intlStrings.maxMessage,
    minMessage: intlStrings.minMessage,
  });
}
