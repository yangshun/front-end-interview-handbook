import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import useProjectsNavItems from '../useProjectsNavItems';

export default function useProjectsSidebarLinks(
  isPremium: boolean,
): ReadonlyArray<NavbarTopLevelItem> {
  const navItems = useProjectsNavItems('sidebar');

  const links: ReadonlyArray<NavbarTopLevelItem | null> = [
    navItems.dashboard,
    navItems.challenges,
    navItems.submissions,
    navItems.features,
    !isPremium ? navItems.pricing : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarTopLevelItem>;
}
