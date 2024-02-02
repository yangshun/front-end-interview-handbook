import type { LexicalEditor } from 'lexical';
import { CLEAR_EDITOR_COMMAND } from 'lexical';

export default function clearEditor(editor: LexicalEditor | null) {
  if (editor) {
    editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
  }
}
