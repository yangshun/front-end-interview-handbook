'use client';

import { useUserPreferences } from '~/components/global/UserPreferencesProvider';

export default function NavbarHeight() {
  const navbarHeight = 65;
  const bannerHeight = 32;
  const { showPromoBanner } = useUserPreferences();

  return showPromoBanner ? (
    <style>{`:root { --navbar-height: ${
      navbarHeight + bannerHeight
    }px; }`}</style>
  ) : (
    <style>{`:root { --navbar-height: ${navbarHeight}px; }`}</style>
  );
}
