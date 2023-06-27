'use client';

import useIsBannerHidden from '../banners/useIsBannerHidden';

const navbarHeight = 65;
const bannerHeight = 40;

export default function NavbarHeight() {
  const isHidden = useIsBannerHidden();

  return isHidden ? (
    <style>{`:root { --navbar-height: ${navbarHeight}px; }`}</style>
  ) : (
    <style>{`:root { --navbar-height: ${
      navbarHeight + bannerHeight
    }px; }`}</style>
  );
}
