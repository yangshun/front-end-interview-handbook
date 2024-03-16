'use client';

import ProjectsProfileProgressAllChallengesTab from './ProjectsProfileProgressAllChallengesTab';

type Props = Readonly<{
  isViewerPremium: boolean;
  userId: string;
}>;

export default function ProjectsProfileProgressSection({
  isViewerPremium,
  userId,
}: Props) {
  return (
    <ProjectsProfileProgressAllChallengesTab
      isViewerPremium={isViewerPremium}
      userId={userId}
    />
  );
}
