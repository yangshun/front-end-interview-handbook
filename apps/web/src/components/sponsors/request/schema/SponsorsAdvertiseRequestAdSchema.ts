import { $getRoot } from 'lexical';
import { z } from 'zod';

import { urlSchema } from '~/lib/urlValidation';

import { useIntl } from '~/components/intl';
import { SponsorAdFormatConfigs } from '~/components/sponsors/SponsorsAdFormatConfigs';
import { RichTextEditorConfig } from '~/components/ui/RichTextEditor/RichTextEditorConfig';

import { createHeadlessEditor } from '@lexical/headless';

const editor = createHeadlessEditor(RichTextEditorConfig);

function bodySchema(options?: {
  maxLength: number;
  maxMessage?: string;
  minMessage?: string;
}) {
  const {
    minMessage = 'Body is required',
    maxMessage = 'Body is too long',
    maxLength = 500,
  } = options ?? {};

  return z
    .string()
    .trim()
    .refine(
      (value) => {
        try {
          const editorState = editor.parseEditorState(value);
          const text = editorState.read(() => $getRoot().getTextContent());

          return text.length >= 1;
        } catch {
          return false;
        }
      },
      {
        message: minMessage,
      },
    )
    .refine(
      (value) => {
        try {
          const editorState = editor.parseEditorState(value);
          const text = editorState.read(() => $getRoot().getTextContent());

          return text.length <= maxLength;
        } catch {
          return false;
        }
      },
      {
        message: maxMessage,
      },
    );
}

/** Schema for schedule validation */
function scheduleSchema(options?: { minMessage: string }) {
  return z
    .array(z.string())
    .min(1, options?.minMessage ?? 'At least one week is required');
}

function useSponsorsAdvertiseAdScheduleSchema() {
  const intl = useIntl();

  return scheduleSchema({
    minMessage: intl.formatMessage({
      defaultMessage: 'At least one week is required',
      description: 'Error message for ads booking',
      id: 'TczmTT',
    }),
  });
}

/** Base schema for ads */
function adBaseSchema(options?: {
  invalidUrlMessage?: string;
  maxLength: number;
  maxTextMessage?: string;
  minTextMessage?: string;
  urlLocalhostMessage?: string;
}) {
  return z.object({
    text: z
      .string()
      .min(1, options?.minTextMessage ?? 'Title is required')
      .max(
        options?.maxLength ?? 100,
        options?.maxTextMessage ?? 'Title is too long',
      ),
    url: urlSchema({
      urlMessage: options?.invalidUrlMessage || 'Invalid URL',
      urlMessageLocalhost:
        options?.urlLocalhostMessage ||
        'The URL must not be localhost or an IP address. Provide a valid, publicly accessible URL.',
    }),
  });
}

function useSponsorsAdvertiseAdBaseSchema(textMaxLength: number) {
  const intl = useIntl();

  return adBaseSchema({
    invalidUrlMessage: intl.formatMessage({
      defaultMessage: 'Invalid URL',
      description: 'Error message for URL',
      id: '88+6BH',
    }),
    maxLength: textMaxLength,
    maxTextMessage: intl.formatMessage(
      {
        defaultMessage: 'Title must be at most {maxLength} characters',
        description: 'Error message for title',
        id: '28DOVL',
      },
      { maxLength: textMaxLength },
    ),
    minTextMessage: intl.formatMessage({
      defaultMessage: 'Title is required',
      description: 'Error message for title',
      id: 'bdirwv',
    }),
    urlLocalhostMessage: intl.formatMessage({
      defaultMessage:
        'The URL must not be localhost or an IP address. Provide a valid, publicly accessible URL.',
      description: 'Error message for URL',
      id: 'KLbE0F',
    }),
  });
}

/** Global Banner Ad Schema */
export function useSponsorsGlobalBannerAdSchema() {
  return useSponsorsAdvertiseAdBaseSchema(
    SponsorAdFormatConfigs.GLOBAL_BANNER.placementConstraints.text,
  ).extend({
    format: z.literal('GLOBAL_BANNER'),
    weeks: useSponsorsAdvertiseAdScheduleSchema(),
  });
}

export const sponsorsGlobalBannerAdSchemaServer = adBaseSchema({
  maxLength: SponsorAdFormatConfigs.GLOBAL_BANNER.placementConstraints.text,
}).extend({ format: z.literal('GLOBAL_BANNER'), weeks: scheduleSchema() });

/** Spotlight Ad Schema */
export function useSponsorsSpotlightAdSchema() {
  const intl = useIntl();
  const imageRequiredMessage = intl.formatMessage({
    defaultMessage: 'Image is required',
    description: 'Error message for image',
    id: 'LwZ1ye',
  });
  const invalidImageUrlMessage = intl.formatMessage({
    defaultMessage: 'Invalid image URL',
    description: 'Error message for image',
    id: 'B0+yAo',
  });

  return useSponsorsAdvertiseAdBaseSchema(
    SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.text,
  ).extend({
    format: z.literal('SPOTLIGHT'),
    imageUrl: z
      .string()
      .url(invalidImageUrlMessage)
      .min(1, imageRequiredMessage),
    weeks: useSponsorsAdvertiseAdScheduleSchema(),
  });
}

export const sponsorsSpotlightAdSchemaServer = adBaseSchema({
  maxLength: SponsorAdFormatConfigs.SPOTLIGHT.placementConstraints.text,
}).extend({
  format: z.literal('SPOTLIGHT'),
  imageUrl: z.string().url('Invalid image URL').min(1, 'Image is required'),
  weeks: scheduleSchema(),
});

/** In-Content Ad Schema */
export function useSponsorsInContentAdSchema() {
  const intl = useIntl();

  const maxLength =
    SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.body?.length ?? 500;

  const bodyMaxLengthMessage = intl.formatMessage(
    {
      defaultMessage: 'Body must be at most {maxLength} characters',
      description: 'Error message for body',
      id: 'TajwCE',
    },
    {
      maxLength:
        SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.body?.length ??
        500,
    },
  );
  const bodyRequiredMessage = intl.formatMessage({
    defaultMessage: 'Body is required',
    description: 'Error message for body',
    id: 'QCyCcO',
  });
  const imageRequiredMessage = intl.formatMessage({
    defaultMessage: 'Image is required',
    description: 'Error message for image',
    id: 'LwZ1ye',
  });
  const invalidImageUrlMessage = intl.formatMessage({
    defaultMessage: 'Invalid image URL',
    description: 'Error message for image',
    id: 'B0+yAo',
  });

  return useSponsorsAdvertiseAdBaseSchema(
    SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.text,
  ).extend({
    body: bodySchema({
      maxLength,
      maxMessage: bodyMaxLengthMessage,
      minMessage: bodyRequiredMessage,
    }),
    format: z.literal('IN_CONTENT'),
    imageUrl: z
      .string()
      .url(invalidImageUrlMessage)
      .min(1, imageRequiredMessage),
    weeks: useSponsorsAdvertiseAdScheduleSchema(),
  });
}

export const sponsorsInContentAdSchemaServer = adBaseSchema({
  maxLength: SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.text,
}).extend({
  body: bodySchema({
    maxLength:
      SponsorAdFormatConfigs.IN_CONTENT.placementConstraints.body?.length ??
      500,
  }),
  format: z.literal('IN_CONTENT'),
  imageUrl: z.string().url('Invalid image URL').min(1, 'Image is required'),
  weeks: scheduleSchema(),
});
