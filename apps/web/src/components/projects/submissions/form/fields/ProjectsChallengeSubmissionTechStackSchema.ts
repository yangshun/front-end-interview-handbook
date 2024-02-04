import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsChallengeSubmissionTechStackSchema(options?: {
  minMessage?: string;
  optional?: boolean;
}) {
  const { minMessage, optional = false } = options ?? {};

  return z.array(z.string()).min(optional ? 0 : 1, { message: minMessage });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionTechStackSchemaServer =
  projectsChallengeSubmissionTechStackSchema({
    minMessage: 'Tech stack cannot be empty.',
  });
export const projectsChallengeSubmissionTechStackOptionalSchemaServer =
  projectsChallengeSubmissionTechStackSchema({
    optional: true,
  });

export function getProjectsChallengeSubmissionTechStackAttributes(
  intl: IntlShape,
) {
  const minMessage = intl.formatMessage({
    defaultMessage: 'Tech stack cannot be empty.',
    description: 'Error message',
    id: 'JbkT4P',
  });

  return {
    validation: {
      minMessage,
      required: true,
    },
  };
}

export function useProjectsChallengeSubmissionTechStackSchema({
  optional,
}: {
  optional?: boolean;
} = {}) {
  const intl = useIntl();
  const intlStrings = getProjectsChallengeSubmissionTechStackAttributes(intl);

  return projectsChallengeSubmissionTechStackSchema({
    minMessage: intlStrings.validation.minMessage,
    optional,
  });
}
