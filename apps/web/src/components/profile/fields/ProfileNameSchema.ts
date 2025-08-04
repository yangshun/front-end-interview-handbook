import { z } from 'zod';

import type { IntlShape } from '~/components/intl';
import { useIntl } from '~/components/intl';

const MIN_LENGTH = 2;
const MAX_LENGTH = 32;

function profileNameSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { maxMessage, minMessage } = options ?? {};

  return z
    .string()
    .min(MIN_LENGTH, { message: minMessage })
    .max(MAX_LENGTH, { message: maxMessage })
    .trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const profileNameSchemaServer = profileNameSchema({
  maxMessage: `Name must contain at most ${MAX_LENGTH} character(s).`,
  minMessage: `Name must contain at least ${MIN_LENGTH} character(s).`,
});

export function getProfileNameAttrs(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Name',
    description: 'Lable for name field',
    id: '+mxyA5',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'John Doe',
    description: 'Placeholder for name field',
    id: 'I5bECx',
  });
  const description = intl.formatMessage(
    {
      defaultMessage:
        'This is the name that will be shown on your profile. Use a maximum of {maxLength} character(s).',
      description: 'Name field description',
      id: '/pokLY',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const maxMessage = intl.formatMessage(
    {
      defaultMessage: 'Name must contain at most {maxLength} character(s).',
      description: 'Error message when display name is too long',
      id: 'z7U2cl',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage: 'Name must contain at least {minLength} character(s).',
      description: 'Error message when display name is too short',
      id: 'AKnqip',
    },
    {
      minLength: MIN_LENGTH,
    },
  );
  const successMessage = intl.formatMessage({
    defaultMessage: 'Your name has been updated.',
    description: 'Success message when for name change',
    id: '3P9YAr',
  });

  return {
    description,
    label,
    placeholder,
    successMessage,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minLength: MIN_LENGTH,
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
