import { trpc } from '../trpc';

export default function useProfile() {
  const { isLoading, data } = trpc.profile.getProfile.useQuery();

  return { isLoading, profile: data };
}
