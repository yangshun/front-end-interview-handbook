import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsSkillListInputSchema(options?: {
  minMessage?: string;
  required?: boolean;
}) {
  const { minMessage, required = true } = options ?? {};

  return z.array(z.string()).min(required ? 1 : 0, { message: minMessage });
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsSkillListInputSchemaServer = projectsSkillListInputSchema({
  minMessage: 'Skills cannot be empty.',
});
export const projectsSkillListInputOptionalSchemaServer =
  projectsSkillListInputSchema({
    required: false,
  });

export function getProjectsSkillListInputAttributes(
  intl: IntlShape,
  required = true,
) {
  const minMessage = intl.formatMessage({
    defaultMessage: 'Skills cannot be empty.',
    description: 'Error message',
    id: '17Rr6T',
  });

  return {
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
  const intlStrings = getProjectsSkillListInputAttributes(intl);

  return projectsSkillListInputSchema({
    minMessage: intlStrings.validation.minMessage,
    required,
  });
}
