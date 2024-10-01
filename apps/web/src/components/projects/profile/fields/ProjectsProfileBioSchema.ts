import type { IntlShape } from 'react-intl';
import { z } from 'zod';

import { useIntl } from '~/components/intl';

const MAX_LENGTH = 2000;

function projectsProfileBioSchema(options?: { maxMessage: string }) {
  const { maxMessage } = options ?? {};

  return z.string().max(MAX_LENGTH, { message: maxMessage }).trim();
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsProfileBioSchemaServer = projectsProfileBioSchema({
  maxMessage: `Bio must contain at most ${MAX_LENGTH} character(s).`,
});

export function getProjectsProfileBioAttrs(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Bio',
    description: 'Label for bio field',
    id: '/DSBg7',
  });
  const placeholder = intl.formatMessage({
    defaultMessage:
      'Tell us anything - about your journey as a front end developer, your goals and next steps, or how you want to connect with others',
    description: 'Placeholder for bio field',
    id: 'IeUbyv',
  });
  const description = intl.formatMessage({
    defaultMessage:
      'Tell us anything - about your journey as a front end developer, your goals and next steps, or how you want to connect with others',
    description: 'Bio field description',
    id: 'THTioO',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage: 'Bio must contain at most {maxLength} character(s).',
      description: 'Error message when bio is too long',
      id: 'BrhcC+',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );

  return {
    description,
    label,
    placeholder,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
    },
  };
}

export function useProjectsProfileBioSchema() {
  const intl = useIntl();
  const intlStrings = getProjectsProfileBioAttrs(intl);

  return projectsProfileBioSchema({
    maxMessage: intlStrings.validation.maxMessage,
  });
}
