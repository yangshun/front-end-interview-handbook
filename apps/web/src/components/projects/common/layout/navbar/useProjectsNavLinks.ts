import useAuthNavItems from '~/components/common/navigation/useAuthNavItems';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import useProjectsNavItems from '../useProjectsNavItems';

export default function useProjectsNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarTopLevelItem> {
  const projectsNavItems = useProjectsNavItems('nav');
  const { login } = useAuthNavItems();

  const links: ReadonlyArray<NavbarTopLevelItem | null> = [
    projectsNavItems.challenges,
    projectsNavItems.submissions,
    !isPremium ? projectsNavItems.pricing : null,
    !isLoggedIn ? login : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarTopLevelItem>;
}
