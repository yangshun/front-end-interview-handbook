import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';

export default function useInterviewsLoggedInLinks() {
  const commonNavItems = useCommonNavItems();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    commonNavItems.interviewsBilling,
    commonNavItems.interviewsSettings,
    commonNavItems.logout,
  ];

  return userNavigation;
}
