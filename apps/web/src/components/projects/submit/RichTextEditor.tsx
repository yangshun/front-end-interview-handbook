'use client';

import clsx from 'clsx';

import { themeElementBorderColor } from '~/components/ui/theme';

import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

export default function RichTextEditor() {
  const editor = useEditor({
    content: '<p>Hello World! 🌎️</p>',
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

  return <EditorContent editor={editor} />;
}
