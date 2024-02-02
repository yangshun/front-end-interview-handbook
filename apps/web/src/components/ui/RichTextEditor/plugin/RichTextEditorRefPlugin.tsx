import type { LexicalEditor } from 'lexical';
import type { MutableRefObject } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

export default function RichTextEditorRefPlugin({
  editorRef,
}: {
  editorRef: MutableRefObject<LexicalEditor | null>;
}) {
  const [editor] = useLexicalComposerContext();

  editorRef.current = editor;

  return null;
}
