import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const navItems = useInterviewsNavItems();

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    navItems.dashboard,
    navItems.practice,
    navItems.guides,
    navItems.blog,
    !isPremium ? navItems.pricing : null,
    !isLoggedIn ? navItems.login : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarPrimaryItem>;
}
