import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

import useProjectsNavItems from '../useProjectsNavItems';

export default function useProjectsNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const commonNavItems = useCommonNavItems();
  const projectsNavItems = useProjectsNavItems();

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    projectsNavItems.dashboard,
    projectsNavItems.challenges,
    projectsNavItems.submissions,
    !isPremium ? projectsNavItems.pricing : null,
    !isLoggedIn ? commonNavItems.login : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarPrimaryItem>;
}
