import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';
import { useEffect } from 'react';

export default function RichTextEditorDisablePlugin({
  disableEditor,
}: {
  disableEditor: boolean;
}) {
  const [editor] = useLexicalComposerContext();

  useEffect(() => {
    editor.setEditable(!disableEditor);
  }, [disableEditor, editor]);

  return null;
}
