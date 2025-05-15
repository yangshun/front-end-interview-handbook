import {
  RiAdvertisementLine,
  RiLogoutBoxLine,
  RiPagesLine,
} from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

export default function useCommonNavItems() {
  const intl = useIntl();

  const { signInUpHref, signInUpLabel } = useAuthSignInUp();
  const { logoutHref, logoutLabel } = useAuthLogout();

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

  const advertise: NavbarTopLevelItem = {
    href: '/advertise-with-us',
    icon: RiAdvertisementLine,
    id: 'advertise',
    label: intl.formatMessage({
      defaultMessage: 'Advertise with us',
      description: 'Link to advertise with us',
      id: '9OVmVF',
    }),
    onClick: () => {
      gtag.event({
        action: `nav.advertise.click`,
        category: 'engagement',
        label: 'Advertise with us',
      });
    },
    position: 'start',
    type: 'link',
  };

  return {
    advertise,
    blog,
    login,
    logout,
  };
}
