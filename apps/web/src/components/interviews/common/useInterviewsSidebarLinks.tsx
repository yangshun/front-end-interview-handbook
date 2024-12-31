import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsSidebarLinks(isLoggedIn: boolean) {
  const navItems = useInterviewsNavItems('sidebar');

  const links = [
    isLoggedIn ? navItems.dashboard : navItems.getStarted,
    ...[
      navItems.practiceQuestions,
      navItems.recommendedPreparation,
      navItems.timeSavers,
      navItems.guides,
    ].map(
      (item) =>
        ({
          ...item,
          position: 'start',
        }) as const,
    ),
  ] as const;

  return links.flatMap((item) => (item != null ? [item] : []));
}
