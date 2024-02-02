import { $getRoot } from 'lexical';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { RichTextEditorConfig } from '~/components/ui/RichTextEditor/RichTextEditorConfig';

import { createHeadlessEditor } from '@lexical/headless';

const MIN_LENGTH = 6;
const MAX_LENGTH = 40000;

const editor = createHeadlessEditor(RichTextEditorConfig);

function discussionsCommentBodySchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { maxMessage, minMessage } = options ?? {};

  return z
    .string()
    .trim()
    .refine(
      (value) => {
        const editorState = editor.parseEditorState(value);
        const text = editorState.read(() => $getRoot().getTextContent());

        return text.length >= MIN_LENGTH;
      },
      {
        message: minMessage,
      },
    )
    .refine(
      (value) => {
        const editorState = editor.parseEditorState(value);
        const text = editorState.read(() => $getRoot().getTextContent());

        return text.length <= MAX_LENGTH;
      },
      {
        message: maxMessage,
      },
    );
}

// TODO: Figure out how to reuse intl strings for the server.
export const discussionsCommentBodySchemaServer = discussionsCommentBodySchema({
  maxMessage: `At most ${MAX_LENGTH} characters.`,
  minMessage: `At least ${MIN_LENGTH} characters.`,
});

export function getDiscussionsCommentBodyAttributes(intl: IntlShape) {
  const placeholder = intl.formatMessage({
    defaultMessage: 'Share your questions or thoughts',
    description: 'Placeholder for discussion post input text area',
    id: 'OrN/z/',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage: 'At most {maxLength} characters.',
      description: 'Error message',
      id: 'fibgI3',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage: 'At least {minLength} characters.',
      description: 'Error message',
      id: 'H4UZ2+',
    },
    {
      minLength: MIN_LENGTH,
    },
  );

  return {
    placeholder,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minLength: MIN_LENGTH,
      minMessage,
      required: true,
    },
  } as const;
}

export function useDiscussionsCommentBodySchema() {
  const intl = useIntl();
  const intlStrings = getDiscussionsCommentBodyAttributes(intl);

  return discussionsCommentBodySchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
  });
}
