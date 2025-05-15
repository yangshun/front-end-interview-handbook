import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import type { LexicalEditor } from 'lexical';
import type { MutableRefObject } from 'react';

export default function RichTextEditorRefPlugin({
  editorRef,
  forwardedRef,
}: {
  editorRef: MutableRefObject<LexicalEditor>;
  forwardedRef: MutableRefObject<LexicalEditor>;
}) {
  const [editor] = useLexicalComposerContext();

  if (forwardedRef) {
    forwardedRef.current = editor;
  }
  editorRef.current = editor;

  return null;
}
