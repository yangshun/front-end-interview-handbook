'use client';

import clsx from 'clsx';
import type { LexicalEditor } from 'lexical';
import { $getRoot, type EditorState } from 'lexical';
import type { FormEventHandler } from 'react';
import { useId } from 'react';
import { FormattedMessage } from 'react-intl';

import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import RichTextEditorToolbar from '~/components/ui/RichTextEditor/components/RichTextEditorToolbar';
import RichTextEditorCodeHighlightPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorCodeHighlightPlugin';
import RichTextEditorTheme from '~/components/ui/RichTextEditor/theme/RichTextEditorTheme';
import Text from '~/components/ui/Text';

import { themeBackgroundElementColor } from '../theme';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  minHeight?: string;
  onBlur?: FormEventHandler<HTMLDivElement>;
  onChange?: (value: string, plainValue: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
}>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx('border-danger focus:border-danger'),
  normal: clsx('border-neutral-300 dark:border-neutral-700'),
};

const editorConfig = {
  namespace: 'MyEditor',
  nodes: [
    ListItemNode,
    ListNode,
    CodeNode,
    CodeHighlightNode,
    QuoteNode,
    HeadingNode,
  ],
  onError() {},
  theme: RichTextEditorTheme,
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
  minHeight = '50px',
}: Props) {
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
        <div
          onClick={() =>
            (document.getElementById(id) as HTMLInputElement).focus()
          }>
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
        </div>
        <div
          className={clsx(
            'relative border rounded',
            themeBackgroundElementColor,
            'prose prose-sm dark:prose-invert',
            'focus-within:border-brand-dark  focus-within:dark:border-brand',
            stateClasses[state],
            className,
          )}>
          <RichTextEditorToolbar />
          <div className="relative h-full" style={{ minHeight }}>
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <ContentEditable
                  className="h-full p-3 focus:outline-none prose prose-sm dark:prose-invert"
                  id={id}
                  onBlur={(e) => onBlur?.(e)}
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
      <HistoryPlugin />
      <ListPlugin />
      <RichTextEditorCodeHighlightPlugin />
    </LexicalComposer>
  );
}
