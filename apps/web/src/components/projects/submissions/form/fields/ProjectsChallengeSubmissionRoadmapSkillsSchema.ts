import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsChallengeSubmissionRoadmapSkillsSchema(options?: {
  minMessage?: string;
  optional?: boolean;
}) {
  const { minMessage, optional = false } = options ?? {};

  return z.array(z.string()).min(optional ? 0 : 1, { message: minMessage });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionRoadmapSkillsSchemaServer =
  projectsChallengeSubmissionRoadmapSkillsSchema({
    minMessage: 'Skills cannot be empty.',
  });
export const projectsChallengeSubmissionRoadmapSkillsOptionalSchemaServer =
  projectsChallengeSubmissionRoadmapSkillsSchema({
    optional: true,
  });

export function getProjectsChallengeSubmissionRoadmapSkillsAttributes(
  intl: IntlShape,
) {
  const minMessage = intl.formatMessage({
    defaultMessage: 'Skills cannot be empty.',
    description: 'Error message',
    id: '17Rr6T',
  });

  return {
    validation: {
      minMessage,
      required: true,
    },
  };
}

export function useProjectsChallengeSubmissionRoadmapSkillsSchema({
  optional,
}: {
  optional?: boolean;
} = {}) {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionRoadmapSkillsAttributes(intl);

  return projectsChallengeSubmissionRoadmapSkillsSchema({
    minMessage: intlStrings.validation.minMessage,
    optional,
  });
}
