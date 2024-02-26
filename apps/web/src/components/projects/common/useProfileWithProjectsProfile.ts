import { trpc } from '~/hooks/trpc';

export default function useProfileWithProjectsProfile() {
  const { isLoading, data } = trpc.projects.profile.getUserProfile.useQuery();

  return { isLoading, profile: data };
}
