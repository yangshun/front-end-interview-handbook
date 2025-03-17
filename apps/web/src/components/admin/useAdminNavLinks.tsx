import useCommonNavItems from '~/components/common/navigation/useCommonNavItems';
import type { NavbarTopLevelItem } from '~/components/ui/Navbar/NavTypes';

import useAdminNavItems from './useAdminNavItems';

export default function useAdminNavLinks(
  isLoggedIn: boolean,
): ReadonlyArray<NavbarTopLevelItem> {
  const commonNavItems = useCommonNavItems();
  const adminNavItems = useAdminNavItems();

  const links: ReadonlyArray<NavbarTopLevelItem | null> = [
    adminNavItems.sponsorshipsRequest,
    !isLoggedIn ? commonNavItems.login : null,
  ];

  return links.flatMap((item) => (item != null ? [item] : []));
}
