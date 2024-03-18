import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

function projectsProfileWebsiteSchema(options?: {
  required: boolean;
  requiredMessage: string;
  urlMessage: string;
}) {
  const { urlMessage, requiredMessage, required } = options ?? {};

  const urlValidation = z
    .string()
    .url({ message: urlMessage })
    .refine(
      (value) => {
        if (required) {
          return !!value;
        }

        return true;
      },
      {
        message: requiredMessage,
      },
    );

  return required
    ? urlValidation
    : z.union([
        urlValidation,
        z
          .literal('')
          .transform(() => {
            return null;
          })
          .nullable(),
      ]);
}

export function getProjectsProfileWebsiteAttributes(intl: IntlShape) {
  const label = intl.formatMessage({
    defaultMessage: 'Personal website',
    description: 'Personal website link field',
    id: '3JSDTC',
  });
  const description = intl.formatMessage({
    defaultMessage: 'Add your socials so that others can find you!',
    description:
      'Description for social link input on Projects profile onboarding page',
    id: 'SbE8XR',
  });
  const placeholder = 'https://johndoe.com';
  const urlMessage = intl.formatMessage({
    defaultMessage: 'URL must start with "https://"',
    description: 'Error message',
    id: 'ms/RqZ',
  });
  const requiredMessage = intl.formatMessage({
    defaultMessage: 'URL is required',
    description: 'Error message',
    id: '93rlLI',
  });

  return {
    description,
    label,
    placeholder,
    validation: {
      required: false,
      requiredMessage,
      urlMessage,
    },
  } as const;
}

export const projectsProfileWebsiteSchemaServer = projectsProfileWebsiteSchema({
  required: false,
  requiredMessage: 'URL is required',
  urlMessage: 'URL must start with "https://"',
});

export function useProjectsProfileWebsiteSchema() {
  const intl = useIntl();
  const intlStrings = getProjectsProfileWebsiteAttributes(intl);

  return projectsProfileWebsiteSchema({
    required: intlStrings.validation.required,
    requiredMessage: intlStrings.validation.requiredMessage,
    urlMessage: intlStrings.validation.urlMessage,
  });
}
