'use client';

import useIsBannerHidden from '../banners/useIsBannerHidden';

const navbarHeight = 65;
const bannerHeight = 56;
const bannerHeightAboveLg = 32;

export default function NavbarHeight() {
  const isHidden = useIsBannerHidden();

  return isHidden ? (
    <style
      suppressHydrationWarning={
        true
      }>{`:root { --navbar-height: ${navbarHeight}px; }`}</style>
  ) : (
    <style suppressHydrationWarning={true}>{`
    :root { --navbar-height: ${navbarHeight + bannerHeight}px; }
    @media (min-width: 1024px) {
      :root { --navbar-height: ${navbarHeight + bannerHeightAboveLg}px; }
    }
    `}</style>
  );
}
