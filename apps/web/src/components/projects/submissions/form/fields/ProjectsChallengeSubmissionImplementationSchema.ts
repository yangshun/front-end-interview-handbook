import { createHeadlessEditor } from '@lexical/headless';
import { $createHeadingNode } from '@lexical/rich-text';
import {
  $createParagraphNode,
  $createTextNode,
  $getRoot,
  $getSelection,
} from 'lexical';
import { z } from 'zod';

import type { IntlShape } from '~/components/intl';
import { useIntl } from '~/components/intl';
import { RichTextEditorConfig } from '~/components/ui/RichTextEditor/RichTextEditorConfig';

const MIN_LENGTH = 80;
const MAX_LENGTH = 20_000;

const editor = createHeadlessEditor(RichTextEditorConfig);

export function getSubmissionImplementationInitialValue() {
  editor.update(
    () => {
      const root = $getRoot();

      $getSelection();

      root.append(
        $createHeadingNode('h4').append(
          $createTextNode('Tech stack and approach'),
        ),
      );
      root.append(
        $createParagraphNode().append(
          $createTextNode(
            '// E.g. Write about how you approached the task, including the tools and stack you used',
          ),
        ),
      );

      root.append(
        $createHeadingNode('h4').append(
          $createTextNode('Useful resources and lessons learnt'),
        ),
      );
      root.append(
        $createParagraphNode().append(
          $createTextNode(
            '// E.g. Help the community by sharing the resources and tips that helped you achieve this task',
          ),
        ),
      );

      root.append(
        $createHeadingNode('h4').append(
          $createTextNode('Notes/questions for community'),
        ),
      );
      root.append(
        $createParagraphNode().append(
          $createTextNode(
            '// E.g. Provide a list of questions or notes for the community when they are reviewing your project, such as specific things you were not sure of',
          ),
        ),
      );
    },
    { discrete: true },
  );

  return JSON.stringify(editor.getEditorState());
}

function projectsChallengeSubmissionImplementationSchema(options?: {
  maxMessage: string;
  minMessage: string;
}) {
  const { maxMessage, minMessage } = options ?? {};

  return z
    .string()
    .trim()
    .refine(
      (value) => {
        try {
          const editorState = editor.parseEditorState(value);
          const text = editorState.read(() => $getRoot().getTextContent());

          return text.length >= MIN_LENGTH;
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

          return text.length <= MAX_LENGTH;
        } catch {
          return false;
        }
      },
      {
        message: maxMessage,
      },
    );
}

// TODO: Figure out how to reuse intl strings for the server.
export const projectsChallengeSubmissionImplementationSchemaServer =
  projectsChallengeSubmissionImplementationSchema({
    maxMessage: `Implementation must contain at most ${MAX_LENGTH} character(s).`,
    minMessage: `Implementation must contain at least ${MIN_LENGTH} character(s).`,
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
        'Implementation must contain at most {maxLength} character(s).',
      description: 'Error message',
      id: 'yv1wII',
    },
    {
      maxLength: MAX_LENGTH,
    },
  );
  const minMessage = intl.formatMessage(
    {
      defaultMessage:
        'Implementation must contain at least {minLength} character(s).',
      description: 'Error message',
      id: '7ZjmR2',
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
