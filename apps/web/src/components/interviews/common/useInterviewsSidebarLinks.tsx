import useInterviewsNavItems from './useInterviewsNavItems';

export default function useInterviewsSidebarLinks() {
  const navItems = useInterviewsNavItems('sidebar');

  const links = [
    navItems.dashboard,
    ...[
      navItems.recommendedPreparation,
      navItems.timeSavers,
      navItems.practiceQuestions,
      navItems.guides,
    ].map(
      (item) =>
        ({
          ...item,
          position: 'start',
        }) as const,
    ),
  ];

  return links.flatMap((item) => (item != null ? [item] : []));
}
