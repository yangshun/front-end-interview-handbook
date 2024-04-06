import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

import useProjectsNavItems from '../useProjectsNavItems';

export default function useProjectsSidebarLinks(
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const navItems = useProjectsNavItems();

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    navItems.dashboard,
    navItems.challenges,
    navItems.submissions,
    !isPremium ? navItems.features : null,
    !isPremium ? navItems.pricing : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarPrimaryItem>;
}
