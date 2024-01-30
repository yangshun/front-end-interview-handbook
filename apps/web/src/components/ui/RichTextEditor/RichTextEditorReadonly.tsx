import { RichTextEditorConfig } from './RichTextEditorConfig';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';

export default function RichTextEditorReadonly({ value }: { value: string }) {
  return (
    <LexicalComposer
      initialConfig={{
        ...RichTextEditorConfig,
        editorState: value ? value : undefined,
      }}>
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={<ContentEditable />}
        placeholder={null}
      />
    </LexicalComposer>
  );
}
