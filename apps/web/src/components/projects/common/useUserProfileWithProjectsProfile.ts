import { trpc } from '~/hooks/trpc';

import { useUser } from '@supabase/auth-helpers-react';

/**
 * Note that the project profile might not exist depending
 * on if they have onboarded
 */
export default function useUserProfileWithProjectsProfile() {
  const user = useUser();
  const { isFetching, data } = trpc.projects.profile.viewer.useQuery(
    undefined,
    {
      enabled: user != null,
    },
  );

  return { isLoading: isFetching, userProfile: data };
}
