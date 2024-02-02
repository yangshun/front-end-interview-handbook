import { useEffect } from 'react';

import { useLexicalComposerContext } from '@lexical/react/LexicalComposerContext';

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
