import useAuthNavItems from '~/components/common/navigation/useAuthNavItems';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';

import type { InterviewsNavPlacement } from './useInterviewsNavItems';
import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsLoggedInLinks(
  placement: InterviewsNavPlacement,
) {
  const interviewsNavItems = useInterviewsNavItems(placement);
  const { logout } = useAuthNavItems();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    interviewsNavItems.billing,
    interviewsNavItems.settings,
    logout,
  ];

  return userNavigation;
}
