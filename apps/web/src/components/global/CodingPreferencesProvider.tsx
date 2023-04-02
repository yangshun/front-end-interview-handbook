'use client';

import type themeList from 'monaco-themes/themes/themelist.json';
import { createContext, useContext } from 'react';
import { useLocalStorage } from 'usehooks-ts';

type ThemeKey = keyof typeof themeList;

type CodingPreferencesContextType = Readonly<{
  setThemeKey: (themeKey: ThemeKey) => void;
  themeKey: ThemeKey;
}>;

const DEFAULT_THEME: ThemeKey = 'dracula';

const CodingPreferencesContext = createContext<CodingPreferencesContextType>({
  // eslint-disable-next-line @typescript-eslint/no-empty-function
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
  const [themeKey, setThemeKey] = useLocalStorage<ThemeKey>(
    'gfe:editor:theme',
    DEFAULT_THEME,
  );

  return (
    <CodingPreferencesContext.Provider value={{ setThemeKey, themeKey }}>
      {children}
    </CodingPreferencesContext.Provider>
  );
}
