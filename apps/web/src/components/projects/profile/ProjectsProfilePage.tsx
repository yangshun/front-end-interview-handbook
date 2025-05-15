'use client';

import type { Profile, ProjectsProfile } from '@prisma/client';
import clsx from 'clsx';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileCategoryTabs from '~/components/projects/profile/ProjectsProfileCategoryTabs';
import ProjectsProfileInfo from '~/components/projects/profile/ProjectsProfileInfo';
import ProjectsProfilePinnedSubmissions from '~/components/projects/profile/ProjectsProfilePinnedSubmissions';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';

type Props = Readonly<{
  children: React.ReactNode;
  isViewingOwnProfile: boolean;
  userProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
}>;

export default function ProjectsProfilePage({
  children,
  isViewingOwnProfile,
  userProfile,
}: Props) {
  const projectsProfileId = userProfile.projectsProfile.id;
  const { data: profileStatistics } =
    trpc.projects.profile.dashboardStatistics.useQuery({
      projectsProfileId,
    });

  const { projectsProfile } = userProfile;
  const baseUrl = `/projects/u/${userProfile.username}`;

  return (
    <div>
      <ProjectsProfileInfo
        isViewingOwnProfile={isViewingOwnProfile}
        userProfile={{ ...userProfile, projectsProfile }}
      />
      <div className="mt-16 md:mt-12">
        <ProjectsProfileStats
          codeReviews={profileStatistics?.codeReviews ?? 0}
          completedChallenges={profileStatistics?.completedChallenges ?? 0}
          isViewingOwnProfile={isViewingOwnProfile}
          submissionViews={profileStatistics?.submissionViews ?? 0}
          upvotes={profileStatistics?.upvotes ?? 0}
        />
      </div>
      <div className="mt-16 md:mt-[60px]">
        <ProjectsProfilePinnedSubmissions
          projectsProfileId={projectsProfileId}
        />
      </div>
      <div className={clsx('flex flex-col gap-8', 'mt-16 md:mt-[72px]')}>
        <ProjectsProfileCategoryTabs baseUrl={baseUrl} />
        {children}
      </div>
    </div>
  );
}
