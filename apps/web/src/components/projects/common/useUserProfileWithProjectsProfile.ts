import { trpc } from '~/hooks/trpc';

import { useUser } from '@supabase/auth-helpers-react';

export default function useUserProfileWithProjectsProfile() {
  const user = useUser();
  const { isLoading, data } = trpc.projects.profile.viewer.useQuery(undefined, {
    enabled: !!user,
  });

  return { isLoading, userProfile: data };
}
