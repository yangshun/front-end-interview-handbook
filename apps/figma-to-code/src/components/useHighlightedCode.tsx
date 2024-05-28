import { useEffect, useState } from 'preact/hooks';
// Load only the necessary modules.
import type { HighlighterCore } from 'shiki/core';
import { getHighlighterCore } from 'shiki/core';
import htmlLang from 'shiki/langs/html.mjs';
import materialThemeOcean from 'shiki/themes/material-theme-ocean.mjs';
import getWasm from 'shiki/wasm';

let highlighter: HighlighterCore | null = null;

export function useHighlightedCode({
  code,
  lang,
}: Readonly<{ code: string; lang: string }>) {
  const [highlightedCode, setHighlightedCode] = useState(code);

  useEffect(() => {
    const highlightCode = async () => {
      if (highlighter == null) {
        highlighter = await getHighlighterCore({
          langs: [htmlLang],
          loadWasm: getWasm,
          themes: [materialThemeOcean],
        });
      }

      try {
        const html = await highlighter.codeToHtml(code, {
          lang,
          theme: 'material-theme-ocean',
        });

        setHighlightedCode(html);
      } catch (error) {
        console.error('Error highlighting code:', error);
      }
    };

    highlightCode();
  }, [code, lang]);

  return highlightedCode;
}
