import { trpc } from '~/hooks/trpc';

export default function useUserProfileWithProjectsProfile() {
  const { isLoading, data } = trpc.projects.profile.viewer.useQuery();

  return { isLoading, userProfile: data };
}
