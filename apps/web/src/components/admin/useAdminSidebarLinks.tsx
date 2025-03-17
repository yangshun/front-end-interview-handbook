import useAdminNavItems from './useAdminNavItems';

export default function useAdminSidebarLinks() {
  const navItems = useAdminNavItems();

  const links = [navItems.sponsorships] as const;

  return links.flatMap((item) => (item != null ? [item] : []));
}
