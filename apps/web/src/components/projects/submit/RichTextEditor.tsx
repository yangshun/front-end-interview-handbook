'use client';

import clsx from 'clsx';
import { type FormEventHandler, type ForwardedRef, forwardRef } from 'react';

import { themeElementBorderColor } from '~/components/ui/theme';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

type Props = Readonly<{
  onBlur?: FormEventHandler<HTMLDivElement>;
  onChange?: FormEventHandler<HTMLDivElement>;
  value: string;
}>;

function RichTextEditor(
  { value, onBlur, onChange }: Props,
  ref: ForwardedRef<HTMLDivElement>,
) {
  const editor = useEditor({
    content: value,
    editorProps: {
      attributes: {
        class: clsx(
          'p-4 rounded-lg',
          ['border', themeElementBorderColor],
          'prose prose-sm dark:prose-invert',
          'focus:outline-none',
        ),
      },
    },
    extensions: [StarterKit],
  });

  return (
    <EditorContent
      ref={ref}
      editor={editor}
      onBlur={onBlur}
      onChange={onChange}
    />
  );
}

export default forwardRef(RichTextEditor);
