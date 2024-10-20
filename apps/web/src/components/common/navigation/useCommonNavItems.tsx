import { RiLogoutBoxLine, RiPagesLine } from 'react-icons/ri';

import gtag from '~/lib/gtag';
import { useAuthLogout, useAuthSignInUp } from '~/hooks/user/useAuthFns';

import { useIntl } from '~/components/intl';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

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

  return { blog, login, logout };
}
