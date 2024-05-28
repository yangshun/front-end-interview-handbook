import { useEffect, useState } from 'preact/hooks';
// Load only the necessary modules.
import type { HighlighterCore } from 'shiki/core';
import { getHighlighterCore } from 'shiki/core';
import htmlLang from 'shiki/langs/html.mjs';
import gitHubLightDefault from 'shiki/themes/github-light-default.mjs';
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
          themes: [materialThemeOcean, gitHubLightDefault],
        });
      }

      try {
        const html = await highlighter.codeToHtml(code, {
          lang,
          themes: {
            dark: 'material-theme-ocean',
            light: 'github-light-default',
          },
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
