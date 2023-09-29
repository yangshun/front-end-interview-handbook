'use client';

import type { Variants } from 'console-feed/lib/definitions/Component';
import type themeList from 'monaco-themes/themes/themelist.json';
import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

export type MonacoEditorThemeKey = keyof typeof themeList;

type CodingPreferencesContextType = Readonly<{
  consoleFontSize: string;
  consoleShouldPreserveLogs: boolean;
  consoleTheme: Variants;
  setConsoleFontSize: (fontSize: string) => void;
  setConsoleShouldPreserveLogs: (shouldPreserveLogs: boolean) => void;
  setConsoleTheme: (theme: Variants) => void;
  setThemeKey: (themeKey: MonacoEditorThemeKey) => void;
  themeKey: MonacoEditorThemeKey;
}>;

const DEFAULT_THEME: MonacoEditorThemeKey = 'dracula';
const DEFAULT_CONSOLE_SHOULD_PRESERVE_LOGS = false;
const DEFAULT_CONSOLE_FONT_SIZE = '12px';
const DEFAULT_CONSOLE_THEME = 'dark';

const CodingPreferencesContext = createContext<CodingPreferencesContextType>({
  consoleFontSize: DEFAULT_CONSOLE_FONT_SIZE,
  consoleShouldPreserveLogs: DEFAULT_CONSOLE_SHOULD_PRESERVE_LOGS,
  consoleTheme: DEFAULT_CONSOLE_THEME,
  setConsoleFontSize: () => {},
  setConsoleShouldPreserveLogs: () => {},
  setConsoleTheme: () => {},
  setThemeKey: () => {},
  themeKey: DEFAULT_THEME,
});

export function useCodingPreferences() {
  return useContext(CodingPreferencesContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function CodingPreferencesProvider({ children }: Props) {
  const [themeKey, setThemeKey] = useLocalStorage<MonacoEditorThemeKey>(
    'gfe:editor:theme',
    DEFAULT_THEME,
  );
  const [consoleShouldPreserveLogs, setConsoleShouldPreserveLogs] =
    useLocalStorage<boolean>(
      'gfe:console:should-preserve-logs',
      DEFAULT_CONSOLE_SHOULD_PRESERVE_LOGS,
    );
  const [consoleFontSize, setConsoleFontSize] = useLocalStorage<string>(
    'gfe:console:font-size',
    DEFAULT_CONSOLE_FONT_SIZE,
  );
  const [consoleTheme, setConsoleTheme] = useLocalStorage<Variants>(
    'gfe:console:theme',
    DEFAULT_CONSOLE_THEME,
  );

  return (
    <CodingPreferencesContext.Provider
      value={{
        consoleFontSize,
        consoleShouldPreserveLogs,
        consoleTheme,
        setConsoleFontSize,
        setConsoleShouldPreserveLogs,
        setConsoleTheme,
        setThemeKey,
        themeKey,
      }}>
      {children}
    </CodingPreferencesContext.Provider>
  );
}
