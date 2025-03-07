import { trpc } from '~/hooks/trpc';

/**
 * Note that the project profile might not exist depending
 * on if they have onboarded
 */
export default function useUserProfileWithProjectsProfile(
  createProjectsProfileIfNotFound = true,
) {
  const { isLoading, data } = trpc.projects.profile.viewer.useQuery({
    createProjectsProfileIfNotFound,
  });

  return { isLoading, userProfile: data };
}
