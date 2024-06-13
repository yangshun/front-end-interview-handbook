import { trpc } from '../trpc';

export default function useUserProfile() {
  const { isLoading, data } = trpc.profile.viewer.useQuery();

  return { isLoading, userProfile: data };
}
