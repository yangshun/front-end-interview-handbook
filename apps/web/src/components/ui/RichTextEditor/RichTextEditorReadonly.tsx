import RichTextEditorTheme from '~/components/ui/RichTextEditor/theme/RichTextEditorTheme';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';

import { LexicalComposer } from '@lexical/react/LexicalComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import LexicalErrorBoundary from '@lexical/react/LexicalErrorBoundary';
import { RichTextPlugin } from '@lexical/react/LexicalRichTextPlugin';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

export default function RichTextEditorReadonly({ value }: { value: string }) {
  return (
    <LexicalComposer
      initialConfig={{
        editable: false,
        editorState: value ? value : undefined,
        namespace: 'MyEditor',
        nodes: [
          ListItemNode,
          ListNode,
          CodeNode,
          CodeHighlightNode,
          QuoteNode,
          HeadingNode,
        ],
        onError() {},
        theme: RichTextEditorTheme,
      }}>
      <RichTextPlugin
        ErrorBoundary={LexicalErrorBoundary}
        contentEditable={<ContentEditable />}
        placeholder={null}
      />
    </LexicalComposer>
  );
}
