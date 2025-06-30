import { RiLogoutBoxLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';

import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';

import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

export default function useAuthNavItems() {
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

  return { login, logout };
}
