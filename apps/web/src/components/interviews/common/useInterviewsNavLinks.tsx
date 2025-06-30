import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsNavLinks(
  isLoggedIn: boolean,
  isPremium: boolean,
): ReadonlyArray<NavbarTopLevelItem> {
  const interviewsNavItems = useInterviewsNavItems('nav');

  const links: ReadonlyArray<NavbarTopLevelItem | null> = [
    isLoggedIn ? interviewsNavItems.dashboard : interviewsNavItems.getStarted,
    interviewsNavItems.prepare,
    !isPremium ? interviewsNavItems.pricing : null,
  ];

  return links.flatMap((item) => (item != null ? [item] : []));
}
