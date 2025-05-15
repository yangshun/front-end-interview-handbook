import { useMonaco } from '@monaco-editor/react';
import type { editor } from 'monaco-editor';
import themeList from 'monaco-themes/themes/themelist.json';
import { useEffect } from 'react';

import type { MonacoEditorThemeKey } from '~/components/global/CodingPreferencesProvider';
import { useCodingPreferences } from '~/components/global/CodingPreferencesProvider';

async function loadMonacoTheme(themeKey: string) {
  const themeModule = await import(
    `monaco-themes/themes/${themeList[themeKey as keyof typeof themeList]}.json`
  );

  return themeModule.default as editor.IStandaloneThemeData;
}

export default function useMonacoEditorTheme(): MonacoEditorThemeKey {
  const monaco = useMonaco();
  const { themeKey } = useCodingPreferences();

  useEffect(() => {
    if (!monaco) {
      return;
    }

    loadMonacoTheme(themeKey).then((themeData) => {
      monaco.editor.defineTheme(themeKey, themeData);
      monaco.editor.setTheme(themeKey);
    });
  }, [monaco, themeKey]);

  return themeKey;
}
