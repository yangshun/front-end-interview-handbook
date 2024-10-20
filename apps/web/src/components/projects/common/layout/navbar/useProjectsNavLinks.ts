import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import useProjectsNavItems from '../useProjectsNavItems';

export default function useProjectsNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarTopLevelItem> {
  const commonNavItems = useCommonNavItems();
  const projectsNavItems = useProjectsNavItems('nav');

  const links: ReadonlyArray<NavbarTopLevelItem | null> = [
    projectsNavItems.challenges,
    projectsNavItems.submissions,
    !isPremium ? projectsNavItems.pricing : null,
    !isLoggedIn ? commonNavItems.login : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarTopLevelItem>;
}
