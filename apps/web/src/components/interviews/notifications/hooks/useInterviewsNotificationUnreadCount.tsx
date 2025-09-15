import { useUser } from '@supabase/auth-helpers-react';

import { trpc } from '~/hooks/trpc';

export default function useInterviewsNotificationUnreadCount() {
  const user = useUser();

  const { data: unreadCount } = trpc.notifications.getUnreadCount.useQuery(
    undefined,
    {
      enabled: user != null,
      refetchOnWindowFocus: true,
    },
  );

  return unreadCount ?? 0;
}
