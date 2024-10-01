import type { IntlShape } from 'react-intl';
import { z } from 'zod';

import { useIntl } from '~/components/intl';

/**
 * https://www.github.com/username/repository-name/subfolderName
 * since this is an url we are allowing all the url safe characters for subfolder
 * check https://datatracker.ietf.org/doc/html/rfc3986#section-2.2
 */
const GITHUB_REPO_URL_REGEX =
  /^(https?:\/\/)?(www\.)?github\.com\/([a-zA-Z0-9-]+)\/([a-zA-Z0-9_.-]+)(\/[a-zA-Z0-9_.~:?#[\]@!$&'()*+,;=%-]*)*$/;

function projectsChallengeSubmissionRepositoryUrlSchema(options?: {
  urlMessage: string;
}) {
  const { urlMessage } = options ?? {};

  return z
    .string()
    .trim()
    .regex(GITHUB_REPO_URL_REGEX, urlMessage)
    .transform((url) => {
      const match = url.match(GITHUB_REPO_URL_REGEX);

      // If no https present in the url, add https in the url
      if (match && !match[1]) {
        return `https://${url}`;
      }

      return url;
    });
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
    defaultMessage: 'GitHub repository or subdirectory URL',
    description: 'Form label',
    id: 'wkkRGq',
  });
  const description = intl.formatMessage({
    defaultMessage:
      'URL to the root or a subdirectory of your GitHub repository. We will use it to pull files onto the platform for code reviews.',
    description: 'Form description',
    id: 'LiRxEy',
  });
  const placeholder = 'https://github.com/username/repository-name';
  const urlMessage = intl.formatMessage({
    defaultMessage: 'Invalid GitHub repository URL',
    description: 'Error message',
    id: 'pQVvOB',
  });

  return {
    description,
    label,
    placeholder,
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
