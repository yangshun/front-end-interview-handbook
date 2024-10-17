import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsSidebarLinks(
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const navItems = useInterviewsNavItems('sidebar');

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    navItems.dashboard,
    {
      ...navItems.practice,
      align: 'center',
    },
    navItems.features,
    !isPremium ? navItems.pricing : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarPrimaryItem>;
}
