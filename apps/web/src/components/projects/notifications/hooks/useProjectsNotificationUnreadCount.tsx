import { trpc } from '~/hooks/trpc';

import { useUser } from '@supabase/auth-helpers-react';

export default function useProjectsNotificationUnreadCount() {
  const user = useUser();

  const { data } = trpc.projects.notifications.getUnreadCount.useQuery(
    undefined,
    {
      enabled: !!user,
      refetchOnWindowFocus: true,
    },
  );

  return data ?? 0;
}
