import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';

export default function useInterviewsLoggedInLinks() {
  const commonNavItems = useCommonNavItems();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    commonNavItems.interviewsProfile,
    commonNavItems.interviewsBilling,
    commonNavItems.logout,
  ];

  return userNavigation;
}
