import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MAX_LENGTH = 80;

function projectsChallengeSubmissionTitleSchema(options?: {
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
export const projectsChallengeSubmissionTitleSchemaServer =
  projectsChallengeSubmissionTitleSchema({
    maxMessage: `Title can contain at most ${MAX_LENGTH} characters.`,
    minMessage: 'Title cannot be empty.',
  });

export function getProjectsChallengeSubmissionTitleAttributes(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Submission title',
    description: 'Label for submission name input on project submit page',
    id: 'feMH7c',
  });
  const description = intl.formatMessage({
    defaultMessage:
      "An eye-catching name to describe your solution. Will be displayed under the original Project's name and help other users identify your submission.",
    description: 'Description for submission name input on project submit page',
    id: 'XYCpWf',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'E.g. "Responsive solution with React and Tailwind CSS"',
    description: 'Placeholder for submission name input on project submit page',
    id: 'zeK111',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage: 'Title can contain at most {maxLength} characters.',
      description: 'Error message',
      id: 'uBXv8c',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage({
    defaultMessage: 'Title cannot be empty.',
    description: 'Error message',
    id: 'EGeNHT',
  });

  return {
    description,
    label,
    placeholder,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
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
