import { notFound } from 'next/navigation';

import ProjectsProfileProgressAllChallengesTab from '~/components/projects/profile/progress/ProjectsProfileProgressAllChallengesTab';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

export default async function Page() {
  const { viewerId, viewerProjectsProfile } =
    await fetchViewerProjectsProfile();

  if (viewerId == null) {
    return notFound();
  }

  return (
    <ProjectsProfileProgressAllChallengesTab
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      targetUserId={viewerId}
    />
  );
}
