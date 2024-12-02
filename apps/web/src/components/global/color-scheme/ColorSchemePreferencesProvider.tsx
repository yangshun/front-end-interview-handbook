'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useLocalStorage } from 'usehooks-ts';

import { COLOR_SCHEME_STORAGE_KEY } from './ColorSchemeInitScript';

export type ColorScheme = 'dark' | 'light';
export type ColorSchemePreference = ColorScheme | 'system';

// TODO: move to https://github.com/pacocoursey/next-themes

type ColorSchemePreferencesContextType = {
  colorScheme: ColorScheme; // Final color scheme to use
  colorSchemePreference: ColorSchemePreference; // Color scheme preference, can be system
  setColorSchemePreference: (
    colorSchemePreference: ColorSchemePreference,
  ) => void;
  systemColorScheme: ColorScheme; // Color scheme preference of the user system
};

const DEFAULT_COLOR_SCHEME_PREFERENCE: ColorSchemePreference = 'system'; // Sync the default with ColorSchemeInitScript
const DEFAULT_COLOR_SCHEME: ColorScheme = 'light';

const ColorSchemePreferencesContext =
  createContext<ColorSchemePreferencesContextType>({
    colorScheme: DEFAULT_COLOR_SCHEME,
    colorSchemePreference: DEFAULT_COLOR_SCHEME_PREFERENCE,
    setColorSchemePreference: () => {},
    systemColorScheme: DEFAULT_COLOR_SCHEME,
  });

export function useColorSchemePreferences() {
  return useContext(ColorSchemePreferencesContext);
}

// Source: https://paco.me/writing/disable-theme-transitions
// https://github.com/pacocoursey/next-themes/blob/main/next-themes/src/index.tsx
function disableAnimation() {
  const css = document.createElement('style');

  css.appendChild(
    document.createTextNode(
      `*,*::before,*::after{-webkit-transition:none!important;-moz-transition:none!important;-o-transition:none!important;-ms-transition:none!important;transition:none!important}`,
    ),
  );
  document.head.appendChild(css);

  return () => {
    // Force restyle
    (() => window.getComputedStyle(document.body))();

    // Wait for next tick before removing
    setTimeout(() => {
      document.head.removeChild(css);
    }, 1);
  };
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

  // Color scheme of the user's system
  const [systemColorScheme, setSystemColorScheme] =
    useState<ColorScheme>(DEFAULT_COLOR_SCHEME);

  // Observe and sync with the system color scheme
  useEffect(() => {
    const prefersDarkColorSchemeQuery = window.matchMedia(
      '(prefers-color-scheme: dark)',
    );

    setSystemColorScheme(
      prefersDarkColorSchemeQuery.matches ? 'dark' : 'light',
    );

    function handleQueryChange(event: MediaQueryListEvent) {
      setSystemColorScheme(event.matches ? 'dark' : 'light');
    }

    // Listen for changes in the system color scheme
    prefersDarkColorSchemeQuery.addEventListener('change', handleQueryChange);

    return () => {
      prefersDarkColorSchemeQuery.removeEventListener(
        'change',
        handleQueryChange,
      );
    };
  }, []);

  // Obtain the resulting color scheme
  const colorScheme = useMemo(() => {
    switch (colorSchemePreference) {
      case 'system':
        return systemColorScheme;
      case 'light':
      case 'dark':
        return colorSchemePreference;
      default:
        return DEFAULT_COLOR_SCHEME;
    }
  }, [colorSchemePreference, systemColorScheme]);

  // Sync color scheme with the DOM
  useEffect(() => {
    const enableAnimation = disableAnimation();

    if (colorScheme === 'dark') {
      document.documentElement.dataset.colorScheme = 'dark';
    } else {
      delete document.documentElement.dataset.colorScheme;
    }

    enableAnimation();
  }, [colorScheme]);

  return (
    <ColorSchemePreferencesContext.Provider
      value={{
        colorScheme,
        colorSchemePreference,
        setColorSchemePreference,
        systemColorScheme,
      }}>
      {children}
    </ColorSchemePreferencesContext.Provider>
  );
}
