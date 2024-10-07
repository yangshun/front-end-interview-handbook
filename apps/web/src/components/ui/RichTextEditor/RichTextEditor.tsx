'use client';

import clsx from 'clsx';
import { $getRoot, type EditorState, type LexicalEditor } from 'lexical';
import type { FormEventHandler, ForwardedRef } from 'react';
import type { MutableRefObject } from 'react';
import { forwardRef, useEffect, useId, useRef, useState } from 'react';

import { FormattedMessage } from '~/components/intl';
import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import RichTextEditorToolbar from '~/components/ui/RichTextEditor/components/RichTextEditorToolbar';
import RichTextEditorCodeHighlightPlugin from '~/components/ui/RichTextEditor/plugin/RichTextEditorCodeHighlightPlugin';
import Text from '~/components/ui/Text';
import { themeTextColor } from '~/components/ui/theme';

import { PLAYGROUND_TRANSFORMERS } from './plugin/MarkdownTransformers';
import RichTextEditorAutoLinkPlugin from './plugin/RichTextEditorAutoLinkPlugin';
import RichTextEditorDisablePlugin from './plugin/RichTextEditorDisablePlugin';
import RichTextEditorLinkPlugin from './plugin/RichTextEditorLinkPlugin';
import RichTextEditorRefPlugin from './plugin/RichTextEditorRefPlugin';
import { RichTextEditorConfig } from './RichTextEditorConfig';
import { proseStyle } from '../Prose';
import TextMaxLengthLabel from '../Text/TextMaxLengthLabel';

import { createHeadlessEditor } from '@lexical/headless';
import { AutoFocusPlugin } from '@lexical/react/LexicalAutoFocusPlugin';
import { ClearEditorPlugin } from '@lexical/react/LexicalClearEditorPlugin';
import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { HistoryPlugin } from '@lexical/react/LexicalHistoryPlugin';
import { HorizontalRulePlugin } from '@lexical/react/LexicalHorizontalRulePlugin';
import { ListPlugin } from '@lexical/react/LexicalListPlugin';
import { MarkdownShortcutPlugin } from '@lexical/react/LexicalMarkdownShortcutPlugin';
import { OnChangePlugin } from '@lexical/react/LexicalOnChangePlugin';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

type Props = Readonly<{
  autoFocus?: boolean;
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  disabled?: boolean;
  errorMessage?: React.ReactNode;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  maxLength?: number;
  minHeight?: string;
  onBlur?: FormEventHandler<HTMLDivElement>;
  onChange?: (value: string) => void;
  placeholder?: string;
  required?: boolean;
  value?: string;
}>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx('ring-danger', 'focus:ring-danger'),
  normal: clsx(
    'ring-neutral-300 dark:ring-neutral-700',
    'focus-within:ring-neutral-700 dark:focus-within:ring-neutral-300',
  ),
};

const editor = createHeadlessEditor(RichTextEditorConfig);

function RichTextEditor(
  {
    autoFocus = false,
    className,
    description,
    descriptionStyle,
    disabled = false,
    errorMessage,
    id: idParam,
    isLabelHidden = false,
    label,
    maxLength,
    minHeight = '50px',
    required,
    value,
    onBlur,
    onChange,
    placeholder,
  }: Props,
  ref: ForwardedRef<LexicalEditor | null>,
) {
  const generatedId = useId();
  const editorRef = useRef<LexicalEditor>(null);
  const id = idParam ?? generatedId;
  const messageId = useId();
  const hasError = !!errorMessage;
  const state = hasError ? 'error' : 'normal';
  const [floatingAnchorElem, setFloatingAnchorElem] =
    useState<HTMLDivElement | null>(null);
  const [valueLength, setValueLength] = useState(0);

  const hasBottomSection = hasError || maxLength != null;

  useEffect(() => {
    try {
      const editorState = editor.parseEditorState(value ?? '{}');
      const textContent = editorState.read(() => $getRoot().getTextContent());

      setValueLength(textContent.length);
    } catch {
      // Ignore error.
    }
  }, [value]);

  const onUpdate = (editorState: EditorState) => {
    onChange?.(JSON.stringify(editorState));
  };

  const onRef = (_floatingAnchorElem: HTMLDivElement) => {
    if (_floatingAnchorElem !== null) {
      setFloatingAnchorElem(_floatingAnchorElem);
    }
  };

  return (
    <LexicalComposer
      initialConfig={{
        ...RichTextEditorConfig,
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
            'relative',
            'bg-white dark:bg-neutral-950',
            'rounded',
            'border-0',
            'ring-1 ring-inset',
            'focus-within:ring-2 focus-within:ring-inset',
            stateClasses[state],
            className,
          )}>
          <RichTextEditorToolbar floatingAnchorElem={floatingAnchorElem} />
          <div className="relative h-full">
            <RichTextPlugin
              ErrorBoundary={LexicalErrorBoundary}
              contentEditable={
                <div ref={onRef} className="relative">
                  <ContentEditable
                    className={clsx(
                      'h-full p-3 focus:outline-none',
                      proseStyle('sm', themeTextColor),
                    )}
                    id={id}
                    style={{ minHeight }}
                    onBlur={(e) => onBlur?.(e)}
                  />
                </div>
              }
              placeholder={
                <div
                  className="absolute left-3 top-3 inline-block overflow-hidden"
                  onClick={() => editorRef.current?.focus()}>
                  <Text color="secondary" size="body2">
                    {placeholder || (
                      <FormattedMessage
                        defaultMessage="Enter"
                        description="Richtext placeholder"
                        id="doYVKC"
                      />
                    )}
                  </Text>
                </div>
              }
            />
            <OnChangePlugin onChange={onUpdate} />
          </div>
        </div>
        {hasBottomSection && (
          <div
            className={clsx(
              'mt-2 flex w-full',
              errorMessage ? 'justify-between' : 'justify-end',
            )}>
            {errorMessage && (
              <Text className="block" color="error" id={messageId} size="body3">
                {errorMessage}
              </Text>
            )}
            {maxLength && (
              <TextMaxLengthLabel
                maxLength={maxLength}
                valueLength={valueLength}
              />
            )}
          </div>
        )}
      </div>
      <HistoryPlugin />
      <ListPlugin />
      {autoFocus && <AutoFocusPlugin />}
      <MarkdownShortcutPlugin transformers={PLAYGROUND_TRANSFORMERS} />
      <RichTextEditorCodeHighlightPlugin />
      <RichTextEditorLinkPlugin />
      <RichTextEditorAutoLinkPlugin />
      <RichTextEditorDisablePlugin disableEditor={disabled} />
      <RichTextEditorRefPlugin
        editorRef={editorRef as MutableRefObject<LexicalEditor>}
        forwardedRef={ref as MutableRefObject<LexicalEditor>}
      />
      <ClearEditorPlugin />
      <HorizontalRulePlugin />
    </LexicalComposer>
  );
}

export default forwardRef(RichTextEditor);
