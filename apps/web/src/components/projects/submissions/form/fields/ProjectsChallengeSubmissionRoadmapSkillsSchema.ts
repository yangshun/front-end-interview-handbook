import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsChallengeSubmissionRoadmapSkillsSchema(options?: {
  minMessage: string;
}) {
  const { minMessage } = options ?? {};

  return z.array(z.string()).min(1, { message: minMessage });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionRoadmapSkillsSchemaServer =
  projectsChallengeSubmissionRoadmapSkillsSchema({
    minMessage: 'Tech stack cannot be empty.',
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

export function useProjectsChallengeSubmissionRoadmapSkillsSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionRoadmapSkillsAttributes(intl);

  return projectsChallengeSubmissionRoadmapSkillsSchema({
    minMessage: intlStrings.validation.minMessage,
  });
}
