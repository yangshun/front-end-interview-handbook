import { trpc } from '../trpc';

export default function useUserProfile() {
  const { isLoading, data } = trpc.profile.getProfile.useQuery();

  return { isLoading, userProfile: data };
}
