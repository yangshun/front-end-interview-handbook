import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsChallengeSubmissionRepositoryUrlSchema(options?: {
  urlMessage: string;
}) {
  const { urlMessage } = options ?? {};

  return z.string().url({ message: urlMessage }).trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionRepositoryUrlSchemaServer =
  projectsChallengeSubmissionRepositoryUrlSchema({
    urlMessage: 'Invalid URL',
  });

export function getProjectsChallengeSubmissionRepositoryUrlAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'GitHub repository URL',
    description: 'Form label',
    id: 'LEA1HM',
  });
  const description = intl.formatMessage({
    defaultMessage:
      'The URL of your GitHub repository. We will also use it to pull files onto the platform for code reviews.',
    description: 'Form description',
    id: 'pvPxFe',
  });
  const placeholder = 'https://github.com/[username]/[repository-name]';
  const urlMessage = intl.formatMessage({
    defaultMessage: 'Invalid URL',
    description: 'Error message',
    id: 'D86N9j',
  });

  return {
    description,
    label,
    placeholder,
    type: 'url',
    validation: {
      required: true,
      urlMessage,
    },
  } as const;
}

export function useProjectsChallengeSubmissionRepositoryUrlSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionRepositoryUrlAttributes(intl);

  return projectsChallengeSubmissionRepositoryUrlSchema({
    urlMessage: intlStrings.validation.urlMessage,
  });
}
