import { h } from 'preact';

import { printGFEHTMLNode, transformGFENode } from '~/nodes/processGFENode';
import type { GFENode } from '~/nodes/types';
import formatHTML from '~/utils/formatHTML';

import { CopyCodeSection } from './CopyCodeSection';
import { useHighlightedCode } from './useHighlightedCode';

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

function HighlightedCode({
  code,
}: Readonly<{
  code: string;
}>) {
  const formattedCode = formatHTML(code);
  const highlightedCode = useHighlightedCode({
    code: formattedCode,
    lang: 'html',
  });

  return (
    <CopyCodeSection
      lang="html"
      title="HTML + Tailwind"
      codeToCopy={code}
      codeHtml={highlightedCode}
    />
  );
}
