import { $getRoot } from 'lexical';
import type { IntlShape } from 'react-intl';
import { useIntl } from 'react-intl';
import { z } from 'zod';

import { RichTextEditorConfig } from '~/components/ui/RichTextEditor/RichTextEditorConfig';

import { createHeadlessEditor } from '@lexical/headless';

const MIN_LENGTH = 50;
const MAX_LENGTH = 1000;

const editor = createHeadlessEditor(RichTextEditorConfig);

function projectsChallengeSubmissionImplementationSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { minMessage, maxMessage } = options ?? {};

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
export const projectsChallengeSubmissionImplementationSchemaServer =
  projectsChallengeSubmissionImplementationSchema({
    maxMessage: `Implementation can contain at most ${MAX_LENGTH} characters.`,
    minMessage: `Implementation can contain at least ${MIN_LENGTH} characters.`,
  });

export function getProjectsChallengeSubmissionImplementationAttributes(
  intl: IntlShape,
) {
  const label = intl.formatMessage({
    defaultMessage: 'Implementation details',
    description: 'Challenge submission form label',
    id: 'AaYDa2',
  });
  const description = intl.formatMessage({
    defaultMessage:
      'Describe your project approach and take the opportunity to document challenges and how they were overcome. To help others in the community, also describe your general tech stack and how they were used together, as well as any guides or resources you used.',
    description: 'Project submission tooltip',
    id: 'EO+aoa',
  });
  const maxMessage = intl.formatMessage(
    {
      defaultMessage:
        'Implementation can contain at most {maxLength} characters.',
      description: 'Error message',
      id: 'Cxrh5Z',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage:
        'Implementation must contain at least {minLength} characters.',
      description: 'Error message',
      id: 'UOB+rs',
    },
    {
      minLength: MIN_LENGTH,
    },
  );

  return {
    description,
    label,
    validation: {
      maxLength: MAX_LENGTH,
      maxMessage,
      minLength: MIN_LENGTH,
      minMessage,
      required: true,
    },
  };
}

export function useProjectsChallengeSubmissionImplementationSchema() {
  const intl = useIntl();
  const intlStrings =
    getProjectsChallengeSubmissionImplementationAttributes(intl);

  return projectsChallengeSubmissionImplementationSchema({
    maxMessage: intlStrings.validation.maxMessage,
    minMessage: intlStrings.validation.minMessage,
  });
}
