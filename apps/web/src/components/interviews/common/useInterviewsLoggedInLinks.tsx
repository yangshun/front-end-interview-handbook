import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';

import type { InterviewsNavPlacement } from './useInterviewsNavItems';
import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsLoggedInLinks(
  placement: InterviewsNavPlacement,
) {
  const commonNavItems = useCommonNavItems();
  const interviewsNavItems = useInterviewsNavItems(placement);

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    interviewsNavItems.billing,
    interviewsNavItems.settings,
    commonNavItems.logout,
  ];

  return userNavigation;
}
