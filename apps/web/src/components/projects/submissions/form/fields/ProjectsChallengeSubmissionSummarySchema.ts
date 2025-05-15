import type { IntlShape } from 'react-intl';
import { z } from 'zod';

import { useIntl } from '~/components/intl';

const MIN_LENGTH = 30;
const MAX_LENGTH = 160;

function projectsChallengeSubmissionSummarySchema(options?: {
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
export const projectsChallengeSubmissionSummarySchemaServer =
  projectsChallengeSubmissionSummarySchema({
    maxMessage: `Submission summary must contain at most ${MAX_LENGTH} character(s).`,
    minMessage: `Submission summary must contain at least ${MIN_LENGTH} character(s).`,
  });

export function getProjectsChallengeSubmissionSummaryAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Submission summary',
    description: 'Form label',
    id: 'iyzDmo',
  });
  const description = intl.formatMessage({
    defaultMessage:
      '1-2 lines on what the project is about, to be displayed on the Submission cards to attract the community to comment on your project',
    description: 'Form label tooltip',
    id: 'VA0CqT',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'Enter 1-2 lines summary of your submission',
    description: 'Placeholder label for submission summary in submission form',
    id: 'wAv4o0',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Submission summary must contain at most {maxLength} character(s).',
      description: 'Error message',
      id: 'IbMc1j',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage:
        'Submission summary must contain at least {minLength} character(s).',
      description: 'Error message for submission summary',
      id: 'YJ9REP',
    },
    {
      minLength: MIN_LENGTH,
    },
  );

  return {
    description,
    label,
    placeholder,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minLength: MIN_LENGTH,
      minMessage,
      required: true,
    },
  };
}

export function useProjectsChallengeSubmissionSummarySchema() {
  const intl = useIntl();
  const intlStrings = getProjectsChallengeSubmissionSummaryAttributes(intl);

  return projectsChallengeSubmissionSummarySchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
  });
}
