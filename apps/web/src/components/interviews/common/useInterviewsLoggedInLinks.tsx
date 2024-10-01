import { RiUserLine, RiWallet3Line } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import { useIntl } from '~/components/intl';
import type { NavLinkItem } from '~/components/ui/Navbar/NavTypes';

export default function useInterviewsLoggedInLinks() {
  const intl = useIntl();
  const commonNavItems = useCommonNavItems();

  const userNavigation: ReadonlyArray<NavLinkItem> = [
    {
      href: '/profile',
      icon: RiUserLine,
      itemKey: 'profile',
      label: intl.formatMessage({
        defaultMessage: 'Profile',
        description: 'Link label to the profile page',
        id: 'BwHkBU',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.profile.click`,
          category: 'engagement',
          label: 'Profile',
        });
      },
      type: 'link',
    },
    {
      href: '/profile/billing',
      icon: RiWallet3Line,
      itemKey: 'billing',
      label: intl.formatMessage({
        defaultMessage: 'Billing',
        description: 'Link label to the billing page',
        id: '45Wusd',
      }),
      onClick: () => {
        gtag.event({
          action: `nav.billing.click`,
          category: 'engagement',
          label: 'Billing',
        });
      },
      type: 'link',
    },
    commonNavItems.logout,
  ];

  return userNavigation;
}
