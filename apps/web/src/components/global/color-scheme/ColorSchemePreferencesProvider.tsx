'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { COLOR_SCHEME_STORAGE_KEY } from './ColorSchemeScript';

export type ColorScheme = 'dark' | 'light';
export type ColorSchemePreference = ColorScheme | 'system';

type ColorSchemePreferencesContextType = {
  colorScheme: ColorScheme;
  colorSchemePreference: ColorSchemePreference;
  resolvedSystemColorScheme: ColorScheme;
  setColorSchemePreference: (
    colorSchemePreference: ColorSchemePreference,
  ) => void;
};

const DEFAULT_COLOR_SCHEME_PREFERENCE: ColorSchemePreference = 'dark';
const DEFAULT_COLOR_SCHEME: ColorScheme = 'dark';

const ColorSchemePreferencesContext =
  createContext<ColorSchemePreferencesContextType>({
    colorScheme: DEFAULT_COLOR_SCHEME,
    colorSchemePreference: DEFAULT_COLOR_SCHEME_PREFERENCE,
    resolvedSystemColorScheme: DEFAULT_COLOR_SCHEME,
    setColorSchemePreference: () => {},
  });

export function useColorSchemePreferences() {
  return useContext(ColorSchemePreferencesContext);
}

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ColorSchemePreferencesProvider({ children }: Props) {
  const [colorSchemePreference, setColorSchemePreference] =
    useLocalStorage<ColorSchemePreference>(
      COLOR_SCHEME_STORAGE_KEY,
      DEFAULT_COLOR_SCHEME_PREFERENCE,
    );

  const [resolvedSystemColorScheme, setResolvedSystemColorScheme] =
    useState<ColorScheme>(DEFAULT_COLOR_SCHEME);

  useEffect(() => {
    const prefersDarkColorSchemeQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    // Initialize the app theme based on the system color scheme.
    setResolvedSystemColorScheme(
      prefersDarkColorSchemeQuery.matches ? 'dark' : 'light',
    );

    const handleQueryChange = (event: MediaQueryListEvent) => {
      setResolvedSystemColorScheme(event.matches ? 'dark' : 'light');
    };

    // Listen for changes in the system color scheme.
    prefersDarkColorSchemeQuery.addEventListener('change', handleQueryChange);

    return () => {
      prefersDarkColorSchemeQuery.removeEventListener(
        'change',
        handleQueryChange,
      );
    };
  }, []);

  const colorScheme = useMemo(() => {
    switch (colorSchemePreference) {
      case 'system':
        return resolvedSystemColorScheme;
      case 'light':
      case 'dark':
        return colorSchemePreference;
      default:
        return DEFAULT_COLOR_SCHEME;
    }
  }, [colorSchemePreference, resolvedSystemColorScheme]);

  useEffect(() => {
    if (colorScheme === 'dark') {
      document.documentElement.dataset.colorScheme = 'dark';
    } else {
      delete document.documentElement.dataset.colorScheme;
    }
  }, [colorScheme]);

  return (
    <ColorSchemePreferencesContext.Provider
      value={{
        colorScheme,
        colorSchemePreference,
        resolvedSystemColorScheme,
        setColorSchemePreference,
      }}>
      {children}
    </ColorSchemePreferencesContext.Provider>
  );
}
