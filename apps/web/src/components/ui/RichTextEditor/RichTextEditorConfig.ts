import RichTextEditorTheme from './theme/RichTextEditorTheme';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { ListItemNode, ListNode } from '@lexical/list';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';

export const RichTextEditorConfig = {
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
};
