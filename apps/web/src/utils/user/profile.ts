import { useIntl } from 'react-intl';
import { z } from 'zod';

function getProfileNameSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { minMessage, maxMessage } = options ?? {};

  return z
    .string()
    .min(1, { message: minMessage })
    .max(32, { message: maxMessage })
    .trim();
}

export const profileNameSchemaServer = getProfileNameSchema();

export function useProfileNameSchema() {
  const intl = useIntl();

  return getProfileNameSchema({
    maxMessage: intl.formatMessage({
      defaultMessage: 'Display name must contain at most 32 characters.',
      description: 'Error message when display name is too long',
      id: '7V+oSQ',
    }),
    minMessage: intl.formatMessage({
      defaultMessage: 'Display name cannot be empty.',
      description: 'Error message when display name is too short',
      id: 'WHx4gl',
    }),
  });
}
