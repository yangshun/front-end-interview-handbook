'use client';

import clsx from 'clsx';
import type { LexicalEditor } from 'lexical';
import { $getRoot, type EditorState } from 'lexical';
import type { FormEventHandler } from 'react';
import { useId, useState } from 'react';
import { FormattedMessage } from 'react-intl';

import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: FormEventHandler<HTMLDivElement>;
  onChange?: (value: string, plainValue: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
}>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx('border-danger', 'focus:border-danger'),
  normal: clsx('border-neutral-300 dark:border-neutral-700'),
};

const editorConfig = {
  namespace: 'MyEditor',
  nodes: [],
  onError() {},
};

export default function RichTextEditor({
  className,
  description,
  descriptionStyle,
  errorMessage,
  id: idParam,
  isLabelHidden = false,
  label,
  required,
  value,
  onBlur,
  onChange,
  placeholder,
}: Props) {
  const [isFocus, setIsFocus] = useState(false);
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const messageId = useId();
  const hasError = !!errorMessage;
  const state = hasError ? 'error' : 'normal';
  const onUpdate = (editorState: EditorState, editor: LexicalEditor) => {
    editorState.read(() => {
      const editorStateJSON = editorState.toJSON();
      const stringifiedEditorState = JSON.stringify(editorStateJSON);
      const parsedEditorState = editor.parseEditorState(stringifiedEditorState);
      const editorStateTextString = parsedEditorState.read(() =>
        $getRoot().getTextContent(),
      );

      onChange?.(stringifiedEditorState, editorStateTextString);
    });
  };

  return (
    <LexicalComposer
      initialConfig={{
        ...editorConfig,
        editorState: value ? value : undefined,
      }}>
      <div
        className={clsx(
          'flex flex-col',
          (description || !isLabelHidden) && 'gap-2',
        )}>
        {/* TODO: Make it such that the editor can be focused as well.  */}
        <Label
          description={
            hasError && descriptionStyle === 'under' ? undefined : description
          }
          descriptionId={messageId}
          descriptionStyle={descriptionStyle}
          htmlFor={id}
          isLabelHidden={isLabelHidden}
          label={label}
          required={required}
        />
        <div
          className={clsx(
            'relative border rounded min-h-[50px]',
            'prose prose-sm dark:prose-invert',
            [stateClasses[state]],
            isFocus &&
              state === 'normal' &&
              '!border-brand-dark dark:!border-brand',
            className,
          )}>
          <div className="relative h-full">
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable
                  className="h-full p-3 focus:outline-none prose prose-sm dark:prose-invert"
                  id={id}
                  onBlur={(e) => {
                    setIsFocus(false);
                    onBlur?.(e);
                  }}
                  onFocus={() => setIsFocus(true)}
                />
              }
              placeholder={
                <div className="absolute left-3 top-3 inline-block overflow-hidden">
                  {placeholder || (
                    <FormattedMessage
                      defaultMessage="Enter"
                      description="Richtext placeholder"
                      id="doYVKC"
                    />
                  )}
                </div>
              }
            />
            <OnChangePlugin onChange={onUpdate} />
          </div>
        </div>
        {hasError && (
          <div
            className={clsx(
              'flex w-full',
              errorMessage ? 'justify-between' : 'justify-end',
            )}>
            {errorMessage && (
              <Text color="error" display="block" id={messageId} size="body3">
                {errorMessage}
              </Text>
            )}
          </div>
        )}
      </div>
    </LexicalComposer>
  );
}
