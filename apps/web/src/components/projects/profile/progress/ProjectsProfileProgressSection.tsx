'use client';

import ProjectsProfileProgressAllChallengesTab from './ProjectsProfileProgressAllChallengesTab';

type Props = Readonly<{
  isViewerPremium: boolean;
  isViewingOwnProfile: boolean;
  targetUserId: string;
}>;

export default function ProjectsProfileProgressSection({
  isViewerPremium,
  isViewingOwnProfile,
  targetUserId,
}: Props) {
  return (
    <ProjectsProfileProgressAllChallengesTab
      isViewerPremium={isViewerPremium}
      isViewingOwnProfile={isViewingOwnProfile}
      targetUserId={targetUserId}
    />
  );
}
