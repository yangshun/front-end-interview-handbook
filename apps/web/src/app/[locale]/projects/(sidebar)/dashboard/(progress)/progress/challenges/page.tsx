import { notFound } from 'next/navigation';

import ProjectsProfileProgressSectionAllChallenges from '~/components/projects/profile/progress/ProjectsProfileProgressSectionAllChallenges';
import fetchViewerProjectsProfile from '~/components/projects/utils/fetchViewerProjectsProfile';

export default async function Page() {
  const { viewerId, viewerProjectsProfile } =
    await fetchViewerProjectsProfile();

  if (viewerId == null) {
    return notFound();
  }

  return (
    <ProjectsProfileProgressSectionAllChallenges
      isViewerPremium={viewerProjectsProfile?.premium ?? false}
      isViewingOwnProfile={true}
      targetUserId={viewerId}
    />
  );
}
