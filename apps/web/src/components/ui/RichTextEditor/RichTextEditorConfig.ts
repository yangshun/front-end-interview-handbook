import { CodeHighlightNode, CodeNode } from '@lexical/code';
import { AutoLinkNode } from '@lexical/link';
import { LinkNode } from '@lexical/link';
import { ListItemNode, ListNode } from '@lexical/list';
import { HorizontalRuleNode } from '@lexical/react/LexicalHorizontalRuleNode';
import { HeadingNode, QuoteNode } from '@lexical/rich-text';
import type { EditorThemeClasses, LexicalNode } from 'lexical';
import type {
  ErrorHandler,
  Klass,
  LexicalNodeReplacement,
} from 'lexical/LexicalEditor';

import { externalLinkHref } from '../Anchor/ExternalLinkHref';
import { CustomAutoLinkNode, CustomLinkNode } from './nodes/CustomLinkNode';
import RichTextEditorTheme from './theme/RichTextEditorTheme';

export type RichTextEditorConfigType = Readonly<{
  namespace: string;
  nodes: ReadonlyArray<Klass<LexicalNode> | LexicalNodeReplacement>;
  onError: ErrorHandler;
  theme: EditorThemeClasses;
}>;

export const richTextEditorConfigCommonNodes = [
  ListItemNode,
  ListNode,
  CodeNode,
  CodeHighlightNode,
  QuoteNode,
  HeadingNode,
  CustomLinkNode,
  CustomAutoLinkNode,
  HorizontalRuleNode,
];

export const RichTextEditorConfig: RichTextEditorConfigType = {
  namespace: 'MyEditor',
  nodes: [
    ...richTextEditorConfigCommonNodes,
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
  ],
  onError() {},
  theme: RichTextEditorTheme,
};

export default function customLinkRichTextEditorConfig(
  customLinkWrapper: (url: string) => string,
): RichTextEditorConfigType {
  return {
    namespace: 'MyEditor',
    nodes: [
      ...richTextEditorConfigCommonNodes,
      {
        replace: LinkNode,
        with: (node: LinkNode) => {
          return new CustomLinkNode(node.getURL(), customLinkWrapper);
        },
      },
      {
        replace: AutoLinkNode,
        with: (node: AutoLinkNode) => {
          return new CustomAutoLinkNode(node.getURL(), customLinkWrapper);
        },
      },
    ],
    onError() {},
    theme: RichTextEditorTheme,
  };
}

export const RichTextEditorWithExternalLinkConfig: RichTextEditorConfigType =
  customLinkRichTextEditorConfig((url) => externalLinkHref({ url }));
