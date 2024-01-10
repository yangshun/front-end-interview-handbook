import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MAX_LENGTH = 32;

function profileNameSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { minMessage, maxMessage } = options ?? {};

  return z
    .string()
    .min(1, { message: minMessage })
    .max(MAX_LENGTH, { message: maxMessage })
    .trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const profileNameSchemaServer = profileNameSchema({
  maxMessage: `Display name must contain at most ${MAX_LENGTH} characters.`,
  minMessage: 'Display name cannot be empty.',
});

export function getProfileNameAttrs(intl: IntlShape) {
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
      maxLength: MAX_LENGTH,
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
      maxLength: MAX_LENGTH,
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
    successMessage,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minMessage,
    },
  };
}

export function useProfileNameSchema() {
  const intl = useIntl();
  const intlStrings = getProfileNameAttrs(intl);

  return profileNameSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
  });
}
