import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsChallengeSubmissionDeploymentUrlSchema(options?: {
  urlMessage: string;
}) {
  const { urlMessage } = options ?? {};

  return z.string().url({ message: urlMessage }).trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionDeploymentUrlSchemaServer =
  projectsChallengeSubmissionDeploymentUrlSchema({
    urlMessage: 'Must be a  Deployment URL.',
  });

export function getProjectsChallengeSubmissionDeploymentUrlAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Live site URL',
    description: 'Form label',
    id: 'fAZVc9',
  });
  const description = intl.formatMessage({
    defaultMessage:
      "The URL where your solution is hosted. Find our recommended free hosting providers if you haven't already.",
    description: 'Form description',
    id: 'djQlZs',
  });
  const placeholder = 'https://my-project.vercel.app';
  const urlMessage = intl.formatMessage({
    defaultMessage: 'Must be a URL.',
    description: 'Error message',
    id: 'bMdB2V',
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

export function useProjectsChallengeSubmissionDeploymentUrlSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionDeploymentUrlAttributes(intl);

  return projectsChallengeSubmissionDeploymentUrlSchema({
    urlMessage: intlStrings.validation.urlMessage,
  });
}
