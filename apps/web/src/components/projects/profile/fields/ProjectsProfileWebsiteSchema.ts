import type { IntlShape } from 'react-intl';
import { z } from 'zod';

import { URL_HTTPS_REGEX } from '~/lib/urlValidation';

import { useIntl } from '~/components/intl';

function projectsProfileWebsiteSchema(options?: {
  required: boolean;
  requiredMessage: string;
  urlMessage: string;
}) {
  const { required, requiredMessage, urlMessage } = options ?? {};

  const urlValidation = z
    .string()
    .regex(URL_HTTPS_REGEX, urlMessage)
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
    )
    .transform((url) => {
      const match = url.match(URL_HTTPS_REGEX);

      // If no https present in the url, add https in the url
      if (match && !match[1]) {
        return `https://${url}`;
      }

      return url;
    });

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

  const placeholder = 'https://johndoe.com';
  const urlMessage = intl.formatMessage({
    defaultMessage: "This URL is invalid. Check if you've typed it correctly.",
    description: 'Error message',
    id: 'Tm6FbS',
  });
  const requiredMessage = intl.formatMessage({
    defaultMessage: 'URL is required',
    description: 'Error message',
    id: '93rlLI',
  });

  return {
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
