'use client';

import clsx from 'clsx';
import {
  type FormEventHandler,
  type ForwardedRef,
  forwardRef,
  useId,
} from 'react';

import type { LabelDescriptionStyle } from '~/components/ui/Label';
import Label from '~/components/ui/Label';
import Text from '~/components/ui/Text';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Props = Readonly<{
  className?: string;
  description?: React.ReactNode;
  descriptionStyle?: LabelDescriptionStyle;
  errorMessage?: React.ReactNode;
  id?: string;
  isLabelHidden?: boolean;
  label: string;
  onBlur?: FormEventHandler<HTMLDivElement>;
  onChange?: (value: string) => void;
  required?: boolean;
  value: string;
}>;

type State = 'error' | 'normal';

const stateClasses: Record<State, string> = {
  error: clsx('ring-danger', 'focus:ring-danger'),
  normal: clsx(
    'ring-neutral-300 dark:ring-neutral-700',
    'focus:ring-brand-dark dark:focus:ring-brand',
  ),
};

function RichTextEditor(
  {
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
  }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const hasError = !!errorMessage;
  const generatedId = useId();
  const id = idParam ?? generatedId;
  const messageId = useId();
  const state = hasError ? 'error' : 'normal';

  const editor = useEditor({
    content: value,
    editorProps: {
      attributes: {
        class: clsx(
          'p-4 rounded',
          'prose prose-sm dark:prose-invert',
          'ring-1',
          [
            'focus:outline-none focus:outline-transparent',
            'focus:ring-2 focus:ring-inset',
            stateClasses[state],
          ],
          className,
        ),
        id,
      },
    },
    extensions: [StarterKit],
    onUpdate: ({ editor: editor_ }) => {
      onChange?.(editor_.getHTML());
    },
  });

  return (
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
      <EditorContent ref={ref} editor={editor} onBlur={onBlur} />
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
  );
}

export default forwardRef(RichTextEditor);
