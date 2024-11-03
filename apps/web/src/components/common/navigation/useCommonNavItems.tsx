import {
  RiLogoutBoxLine,
  RiPagesLine,
  RiUserLine,
  RiWallet3Line,
} from 'react-icons/ri';

import gtag from '~/lib/gtag';
import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import type {
  NavbarTopLevelItem,
  NavLinkItem,
} from '~/components/ui/Navbar/NavTypes';

export default function useCommonNavItems() {
  const intl = useIntl();

  const { signInUpLabel, signInUpHref } = useAuthSignInUp();
  const { logoutLabel, logoutHref } = useAuthLogout();

  const login: NavbarTopLevelItem = {
    href: signInUpHref(),
    itemKey: 'login',
    label: signInUpLabel,
    onClick: () => {
      gtag.event({
        action: `nav.sign_in.click`,
        category: 'engagement',
        label: signInUpLabel,
      });
    },
    position: 'end',
    type: 'link',
  };
  const logout: NavbarTopLevelItem = {
    href: logoutHref(),
    icon: RiLogoutBoxLine,
    itemKey: 'logout',
    label: logoutLabel,
    onClick: () => {
      gtag.event({
        action: `nav.sign_out.click`,
        category: 'engagement',
        label: logoutLabel,
      });
    },
    position: 'end',
    type: 'link',
  };
  const blog: NavbarTopLevelItem = {
    href: '/blog',
    icon: RiPagesLine,
    itemKey: 'blog',
    label: intl.formatMessage({
      defaultMessage: 'Blog',
      description: 'Link to blog',
      id: 'pBR3LI',
    }),
    onClick: () => {
      gtag.event({
        action: `nav.blog.click`,
        category: 'engagement',
        label: 'Blog',
      });
    },
    position: 'start',
    type: 'link',
  };
  const interviewsProfile: NavLinkItem = {
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
  };
  const interviewsBilling: NavLinkItem = {
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
  };

  return { blog, interviewsBilling, interviewsProfile, login, logout };
}
