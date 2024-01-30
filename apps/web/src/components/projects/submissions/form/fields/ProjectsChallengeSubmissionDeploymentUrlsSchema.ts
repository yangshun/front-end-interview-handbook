import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;

function projectsChallengeSubmissionDeploymentUrlsSchema(options?: {
  maxMessage: string;
  minMessage: string;
  urlMessage: string;
}) {
  const { urlMessage, maxMessage, minMessage } = options ?? {};

  return z.array(
    z.object({
      href: z.string().url({ message: urlMessage }),
      label: z
        .string()
        .min(MIN_LENGTH, { message: minMessage })
        .max(MAX_LENGTH, { message: maxMessage })
        .trim(),
      screenshots: z.record(z.string().min(1), z.string().min(1)).optional(),
    }),
  );
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionDeploymentUrlsSchemaServer =
  projectsChallengeSubmissionDeploymentUrlsSchema({
    maxMessage: `Page can contain at most ${MAX_LENGTH} characters.`,
    minMessage: `Page can contain at least ${MIN_LENGTH} characters.`,
    urlMessage: 'Must be a deployment URL.',
  });

export function getProjectsChallengeSubmissionDeploymentUrlsAttributes(
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
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Implementation can contain at most {maxLength} characters.',
      description: 'Error message',
      id: 'Cxrh5Z',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage:
        'Implementation must contain at least {minLength} characters.',
      description: 'Error message',
      id: 'UOB+rs',
    },
    {
      minLength: MIN_LENGTH,
    },
  );

  return {
    description,
    label,
    placeholder,
    type: 'url',
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minLength: MIN_LENGTH,
      minMessage,
      required: true,
      urlMessage,
    },
  } as const;
}

export function useProjectsChallengeSubmissionDeploymentUrlsSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);

  return projectsChallengeSubmissionDeploymentUrlsSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
    urlMessage: intlStrings.validation.urlMessage,
  });
}
