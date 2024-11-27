import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsSidebarLinks(isLoggedIn: boolean) {
  const navItems = useInterviewsNavItems('sidebar');

  const links = [
    {
      ...(isLoggedIn ? navItems.dashboard : navItems.getStarted),
      slug: 'get-started',
    } as const,
    ...[
      navItems.recommendedPreparation,
      navItems.timeSavers,
      navItems.practiceQuestions,
      navItems.guides,
    ].map(
      (item) =>
        ({
          ...item,
          items: item.items.map((itemItem) => ({
            ...itemItem,
            slug: itemItem.itemKey,
          })),
          position: 'start',
          slug: item.itemKey,
        }) as const,
    ),
  ] as const;

  return links.flatMap((item) => (item != null ? [item] : []));
}
