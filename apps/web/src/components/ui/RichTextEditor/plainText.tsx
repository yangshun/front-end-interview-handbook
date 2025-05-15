import { createHeadlessEditor } from '@lexical/headless';
import { $getRoot } from 'lexical';

import { RichTextEditorConfig } from './RichTextEditorConfig';

const editor = createHeadlessEditor(RichTextEditorConfig);

export default function plainText(value: string) {
  const editorState = editor.parseEditorState(value);

  return editorState.read(() => $getRoot().getTextContent());
}
