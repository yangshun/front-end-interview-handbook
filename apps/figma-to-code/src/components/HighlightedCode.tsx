import { h } from 'preact';

import formatHTML from '~/utils/formatHTML';

import { CopyCodeSection } from './CopyCodeSection';
import { useHighlightedCode } from './useHighlightedCode';

export function HighlightedCode({
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
