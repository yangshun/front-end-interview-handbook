import { trpc } from '../trpc';

export default function useUserProfile() {
  const { data, isLoading } = trpc.profile.viewer.useQuery();

  return { isLoading, userProfile: data };
}
