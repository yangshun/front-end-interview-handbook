import { trpc } from '~/hooks/trpc';

import useUserProfileWithProjectsProfile from '../../common/useUserProfileWithProjectsProfile';

export default function useProjectsNotificationUnreadCount() {
  const { isLoading, userProfile } = useUserProfileWithProjectsProfile();

  const { data: unreadCount } =
    trpc.projects.notifications.getUnreadCount.useQuery(undefined, {
      enabled: userProfile?.projectsProfile != null,
      refetchOnWindowFocus: true,
    });

  return isLoading ? unreadCount ?? 0 : 0;
}
