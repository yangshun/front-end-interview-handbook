'use client';

import { useEffect } from 'react';

import { useAppThemePreferences } from '~/components/global/AppThemePreferencesProvider';

export default function HTMLThemeUpdater() {
  const { appTheme } = useAppThemePreferences();

  useEffect(() => {
    if (appTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [appTheme]);

  return null;
}
