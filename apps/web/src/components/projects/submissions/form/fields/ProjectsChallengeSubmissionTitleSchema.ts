import type { IntlShape } from 'react-intl';
import { z } from 'zod';

import { useIntl } from '~/components/intl';

const MIN_LENGTH = 20;
const MAX_LENGTH = 80;

function projectsChallengeSubmissionTitleSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { minMessage, maxMessage } = options ?? {};

  return z
    .string()
    .trim()
    .min(MIN_LENGTH, { message: minMessage })
    .max(MAX_LENGTH, { message: maxMessage });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionTitleSchemaServer =
  projectsChallengeSubmissionTitleSchema({
    maxMessage: `Submission title must contain at most ${MAX_LENGTH} character(s).`,
    minMessage: `Submission title must contain at least ${MIN_LENGTH} character(s).`,
  });

export function getProjectsChallengeSubmissionTitleAttributes(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Submission title',
    description: 'Label for submission title input on project submit page',
    id: 'kmemRr',
  });
  const description = intl.formatMessage({
    defaultMessage:
      "An eye-catching name to describe your solution. Will be displayed under the original Project's name and help other users identify your submission.",
    description:
      'Description for submission title input on project submit page',
    id: 'I+Qcp7',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'E.g. "Responsive solution with React and Tailwind CSS"',
    description: 'Placeholder for submission name input on project submit page',
    id: 'zeK111',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Submission title must contain at most {maxLength} character(s).',
      description: 'Error message for submission title',
      id: '5y9YGh',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage:
        'Submission title must contain at least {minLength} character(s).',
      description: 'Error message for submission title',
      id: 'goncmR',
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

export function useProjectsChallengeSubmissionTitleSchema() {
  const intl = useIntl();
  const intlStrings = getProjectsChallengeSubmissionTitleAttributes(intl);

  return projectsChallengeSubmissionTitleSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
  });
}
