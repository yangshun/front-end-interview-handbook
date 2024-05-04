import { CustomAutoLinkNode, CustomLinkNode } from './nodes/CustomLinkNode';
import RichTextEditorTheme from './theme/RichTextEditorTheme';

import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode } from '@lexical/link';
import { LinkNode } from '@lexical/link';
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
    CustomLinkNode,
    CustomAutoLinkNode,
    {
      replace: LinkNode,
      with: (node: LinkNode) => {
        return new CustomLinkNode(node.getURL());
      },
    },
    {
      replace: AutoLinkNode,
      with: (node: AutoLinkNode) => {
        return new CustomAutoLinkNode(node.getURL());
      },
    },
    HorizontalRuleNode,
  ],
  onError() {},
  theme: RichTextEditorTheme,
};
