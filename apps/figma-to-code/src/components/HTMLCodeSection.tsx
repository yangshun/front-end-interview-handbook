import { h } from 'preact';

import { printGFEHTMLNode, transformGFENode } from '~/nodes/processGFENode';
import type { GFENode } from '~/nodes/types';

import { HighlightedCode } from './HighlightedCode';

export function HTMLCodeSection({
  node,
}: Readonly<{
  node: GFENode;
}>) {
  const htmlNode = transformGFENode(node);

  if (htmlNode == null) {
    return null;
  }

  const code = printGFEHTMLNode(htmlNode);

  return <HighlightedCode code={code} />;
}
