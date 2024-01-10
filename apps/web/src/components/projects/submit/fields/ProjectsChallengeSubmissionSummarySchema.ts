import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MAX_LENGTH = 40;

function projectsChallengeSubmissionSummarySchema(options?: {
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
export const projectsChallengeSubmissionSummarySchemaServer =
  projectsChallengeSubmissionSummarySchema({
    maxMessage: `Summary can contain at most ${MAX_LENGTH} characters.`,
    minMessage: 'Summary cannot be empty.',
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
  const maxMessage = intl.formatMessage(
    {
      defaultMessage: 'Summary can contain at most {maxLength} characters.',
      description: 'Error message',
      id: 'TSfoge',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage({
    defaultMessage: 'Summary cannot be empty.',
    description: 'Error message',
    id: 'D8ZinO',
  });

  return {
    description,
    label,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
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
