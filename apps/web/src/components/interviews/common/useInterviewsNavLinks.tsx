import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarTopLevelItem> {
  const commonNavItems = useCommonNavItems();
  const interviewsNavItems = useInterviewsNavItems('nav');

  const links: ReadonlyArray<NavbarTopLevelItem | null> = [
    isLoggedIn ? interviewsNavItems.dashboard : interviewsNavItems.getStarted,
    interviewsNavItems.practice,
    !isPremium ? interviewsNavItems.pricing : null,
    !isLoggedIn ? commonNavItems.login : null,
  ];

  return links.flatMap((item) => (item != null ? [item] : []));
}
