import { useEffect, useState } from 'preact/hooks';
import { codeToHtml } from 'shiki';

export function useHighlightedCode({
  code,
  lang,
}: Readonly<{ code: string; lang: string }>) {
  const [highlightedCode, setHighlightedCode] = useState(code);

  useEffect(() => {
    const highlightCode = async () => {
      try {
        const html = await codeToHtml(code, {
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
