import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import useAuthNavItems from '../common/navigation/useAuthNavItems';
import useAdminNavItems from './useAdminNavItems';

export default function useAdminNavLinks(
  isLoggedIn: boolean,
): ReadonlyArray<NavbarTopLevelItem> {
  const adminNavItems = useAdminNavItems();
  const { login } = useAuthNavItems();

  const links: ReadonlyArray<NavbarTopLevelItem | null> = [
    adminNavItems.sponsorshipsRequest,
    !isLoggedIn ? login : null,
  ];

  return links.flatMap((item) => (item != null ? [item] : []));
}
