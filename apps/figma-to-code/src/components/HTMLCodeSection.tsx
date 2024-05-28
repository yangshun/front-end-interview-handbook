import { h } from 'preact';

import { printGFEHTMLNode, transformGFENode } from '~/nodes/processGFENode';
import type { GFENode } from '~/nodes/types';
import formatHTML from '~/utils/formatHTML';

import { CopyCodeSection } from './CopyCodeSection';

export function HTMLCodeSection({
  node,
}: Readonly<{
  node: GFENode;
}>) {
  const htmlNode = transformGFENode(node);

  if (htmlNode == null) {
    return null;
  }

  const code = formatHTML(printGFEHTMLNode(htmlNode));

  return (
    <CopyCodeSection title="HTML + Tailwind" codeToCopy={code} code={code} />
  );
}
