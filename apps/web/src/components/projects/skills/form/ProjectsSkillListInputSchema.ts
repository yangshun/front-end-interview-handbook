import type { IntlShape } from 'react-intl';
import { z } from 'zod';

import { useIntl } from '~/components/intl';

function projectsSkillListInputSchema(options?: {
  minMessage?: string;
  required?: boolean;
}) {
  const { minMessage, required = true } = options ?? {};

  return z.array(z.string()).min(required ? 1 : 0, { message: minMessage });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsSkillListInputSchemaServer = projectsSkillListInputSchema({
  minMessage: 'Select at least 1 skill that was used',
});
export const projectsSkillListInputOptionalSchemaServer =
  projectsSkillListInputSchema({
    required: false,
  });

export function getProjectsRoadmapSkillsInputAttributes(
  intl: IntlShape,
  required = true,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Skills used',
    description: 'Label for skills roadmap input on project submit page',
    id: 'NBmwqq',
  });
  const description = intl.formatMessage({
    defaultMessage:
      'The skills you are using in this project, which are in our skills roadmap. Helps us track your progress on skills development',
    description: 'Description for skills roadmap input on project submit page',
    id: 'YwBuE7',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'Select from skill roadmap',
    description: 'Placeholder for skills roadmap input on project submit page',
    id: 'GDAahk',
  });
  const minMessage = intl.formatMessage({
    defaultMessage: 'Select at least 1 skill that was used',
    description: 'Error message',
    id: 'BfCWYl',
  });

  return {
    description,
    label,
    placeholder,
    validation: {
      minMessage,
      required,
    },
  };
}
export function getProjectsTechStackInputAttributes(
  intl: IntlShape,
  required = true,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Other tech stack used (outside of skills roadmap)',
    description: 'Label for tech stack input on project submit page',
    id: 'jNLP4m',
  });
  const description = intl.formatMessage({
    defaultMessage:
      "Other skills you are using which are not within the skills roadmap. Also helps community members understand more about the tech stack. If you don't see the tag you need, email us.",
    description: 'Description for tech stack input on project submit page',
    id: 'qBPU/e',
  });
  const placeholder = intl.formatMessage({
    defaultMessage: 'E.g. React, Next.js, Tailwind CSS, etc.',
    description: 'Placeholder for tech stack input on project submit page',
    id: 'WyXV2L',
  });
  const minMessage = intl.formatMessage({
    defaultMessage: 'Skills is required.',
    description: 'Error message',
    id: 'X/fzHZ',
  });

  return {
    description,
    label,
    placeholder,
    validation: {
      minMessage,
      required,
    },
  };
}

export function useProjectsSkillListInputSchema({
  required = true,
}: {
  required?: boolean;
} = {}) {
  const intl = useIntl();
  const intlStrings = getProjectsRoadmapSkillsInputAttributes(intl);

  return projectsSkillListInputSchema({
    minMessage: intlStrings.validation.minMessage,
    required,
  });
}
