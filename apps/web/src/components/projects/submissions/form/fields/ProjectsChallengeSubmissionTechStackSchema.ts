import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsChallengeSubmissionTechStackSchema(options?: {
  minMessage: string;
}) {
  const { minMessage } = options ?? {};

  return z.array(z.string()).min(1, { message: minMessage });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionTechStackSchemaServer =
  projectsChallengeSubmissionTechStackSchema({
    minMessage: 'Tech stack cannot be empty.',
  });

export function getProjectsChallengeSubmissionTechStackAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Other tech stack used (not covered in skills roadmap)',
    description: 'Label for "Other tech stack used" text input',
    id: 'DPUrhz',
  });
  const description = intl.formatMessage({
    defaultMessage:
      "Other skills you are using which are not within the skills tree. Also helps community members understand more about the tech stack. If you don't see the tag you need, email us.",
    description: 'Description for "Other tech stack used" text input',
    id: 'vPrrHQ',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'Tech stack',
    description: 'Placeholder for "Other tech stack used" text input',
    id: 'jvi6yy',
  });
  const minMessage = intl.formatMessage({
    defaultMessage: 'Tech stack cannot be empty.',
    description: 'Error message',
    id: 'JbkT4P',
  });

  return {
    description,
    label,
    placeholder,
    validation: {
      minMessage,
      required: true,
    },
  };
}

export function useProjectsChallengeSubmissionTechStackSchema() {
  const intl = useIntl();
  const intlStrings = getProjectsChallengeSubmissionTechStackAttributes(intl);

  return projectsChallengeSubmissionTechStackSchema({
    minMessage: intlStrings.validation.minMessage,
  });
}
