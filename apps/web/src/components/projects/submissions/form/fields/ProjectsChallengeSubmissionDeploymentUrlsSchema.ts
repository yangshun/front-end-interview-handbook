import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

const MIN_LENGTH = 2;
const MAX_LENGTH = 50;

function projectsChallengeSubmissionDeploymentUrlItemSchema(options?: {
  maxMessage: string;
  minMessage: string;
  urlMessage: string;
}) {
  const { urlMessage, maxMessage, minMessage } = options ?? {};

  return z.object({
    href: z.string().url({ message: urlMessage }),
    label: z
      .string()
      .min(MIN_LENGTH, { message: minMessage })
      .max(MAX_LENGTH, { message: maxMessage })
      .trim(),
  });
}

function projectsChallengeSubmissionDeploymentUrlsSchema(options?: {
  maxMessage: string;
  minItemMessage: string;
  minMessage: string;
  urlMessage: string;
}) {
  const { urlMessage, maxMessage, minMessage, minItemMessage } = options ?? {};

  return z
    .array(
      projectsChallengeSubmissionDeploymentUrlItemSchema(options).extend({
        href: z.string().url({ message: urlMessage }),
        label: z
          .string()
          .min(MIN_LENGTH, { message: minMessage })
          .max(MAX_LENGTH, { message: maxMessage })
          .trim(),
        screenshots: z.record(z.string().min(1), z.string().min(1)).optional(),
      }),
    )
    .min(1, {
      message: minItemMessage,
    });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionDeploymentUrlsSchemaServer =
  projectsChallengeSubmissionDeploymentUrlsSchema({
    maxMessage: `Page can contain at most ${MAX_LENGTH} characters.`,
    minItemMessage: `Add at least one URL.`,
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
      defaultMessage: 'Page name can contain at most {maxLength} characters.',
      description: 'Error message',
      id: '/sjUMM',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage: 'Page name must contain at least {minLength} characters.',
      description: 'Error message',
      id: 'A7o+ui',
    },
    {
      minLength: MIN_LENGTH,
    },
  );
  const minItemMessage = intl.formatMessage({
    defaultMessage: 'Add at least one URL.',
    description: 'Error message',
    id: 'zoxc1N',
  });

  return {
    description,
    label,
    placeholder,
    type: 'url',
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minItemMessage,
      minLength: MIN_LENGTH,
      minMessage,
      required: true,
      urlMessage,
    },
  } as const;
}

export function useProjectsChallengeSubmissionDeploymentUrlItemSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);

  return projectsChallengeSubmissionDeploymentUrlItemSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
    urlMessage: intlStrings.validation.urlMessage,
  });
}

export function useProjectsChallengeSubmissionDeploymentUrlsSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionDeploymentUrlsAttributes(intl);

  return projectsChallengeSubmissionDeploymentUrlsSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minItemMessage: intlStrings.validation.minItemMessage,
    minMessage: intlStrings.validation.minMessage,
    urlMessage: intlStrings.validation.urlMessage,
  });
}
