import {
  RiLogoutBoxLine,
  RiPagesLine,
  RiSettings3Line,
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
    id: 'login',
    label: signInUpLabel,
    onClick: () => {
      gtag.event({
        action: `nav.sign_in.click`,
        category: 'engagement',
        label: signInUpLabel,
      });
    },
    position: 'end',
    suppressHydrationWarning: true,
    type: 'link',
  };
  const logout: NavbarTopLevelItem = {
    href: logoutHref(),
    icon: RiLogoutBoxLine,
    id: 'logout',
    label: logoutLabel,
    onClick: () => {
      gtag.event({
        action: `nav.sign_out.click`,
        category: 'engagement',
        label: logoutLabel,
      });
    },
    position: 'end',
    suppressHydrationWarning: true,
    type: 'link',
  };
  const blog: NavbarTopLevelItem = {
    href: '/blog',
    icon: RiPagesLine,
    id: 'blog',
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
  const interviewsSettings: NavLinkItem = {
    href: '/profile',
    icon: RiSettings3Line,
    id: 'profile',
    label: intl.formatMessage({
      defaultMessage: 'Settings',
      description: 'Link label to the profile page',
      id: 'SWnsuA',
    }),
    onClick: () => {
      gtag.event({
        action: `nav.profile.click`,
        category: 'engagement',
        label: 'Settings',
      });
    },
    type: 'link',
  };
  const interviewsBilling: NavLinkItem = {
    href: '/profile/billing',
    icon: RiWallet3Line,
    id: 'billing',
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

  return { blog, interviewsBilling, interviewsSettings, login, logout };
}
