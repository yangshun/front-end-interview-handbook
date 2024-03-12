'use client';

import ProjectsProfileProgressAllChallengesTab from './ProjectsProfileProgressAllChallengesTab';
import useProfileWithProjectsProfile from '../../common/useProfileWithProjectsProfile';

type Props = Readonly<{
  isViewerPremium: boolean;
  userId?: string;
}>;

export default function ProjectsProfileProgressSection({
  isViewerPremium,
  userId,
}: Props) {
  const { profile } = useProfileWithProjectsProfile();

  return (
    <ProjectsProfileProgressAllChallengesTab
      isViewerPremium={isViewerPremium}
      userId={userId ?? profile?.id}
    />
  );
}
