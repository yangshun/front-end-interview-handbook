import RichTextEditorTheme from './theme/RichTextEditorTheme';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
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
    LinkNode,
    AutoLinkNode,
    HorizontalRuleNode,
  ],
  onError() {},
  theme: RichTextEditorTheme,
};
