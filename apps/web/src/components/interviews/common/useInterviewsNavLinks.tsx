import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavbarPrimaryItem } from '~/components/ui/Navbar/NavTypes';

import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarPrimaryItem> {
  const commonNavItems = useCommonNavItems();
  const interviewsNavItems = useInterviewsNavItems('nav');

  const links: ReadonlyArray<NavbarPrimaryItem | null> = [
    interviewsNavItems.dashboard,
    interviewsNavItems.practice,
    !isPremium ? interviewsNavItems.pricing : null,
    !isLoggedIn ? commonNavItems.login : null,
  ];

  return links.filter(
    (item) => item != null,
  ) as ReadonlyArray<NavbarPrimaryItem>;
}
