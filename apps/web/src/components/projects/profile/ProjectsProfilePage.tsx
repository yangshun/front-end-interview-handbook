'use client';

import { notFound } from 'next/navigation';
import { RiPencilLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsProgressAndContributionsTabs from '~/components/projects/common/progress-and-contributions/ProjectsProgressAndContributionsTabs';
import ProjectsProfileInfo from '~/components/projects/profile/ProjectsProfileInfo';
import ProjectsProfilePinnedSubmissions from '~/components/projects/profile/ProjectsProfilePinnedSubmissions';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import type { Profile, ProjectsProfile } from '@prisma/client';

type Props = Readonly<{
  children: React.ReactNode;
  initialUserProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
  isViewingOwnProfile: boolean;
}>;

export default function ProjectsProfilePage({
  children,
  initialUserProfile,
  isViewingOwnProfile,
}: Props) {
  const intl = useIntl();

  // For displaying the most updated profile data,
  // useful after someone edits their profile.
  const { data: userProfileFetched } = trpc.projects.profile.get.useQuery(
    undefined,
    {
      enabled: isViewingOwnProfile,
      initialData: initialUserProfile,
      refetchOnMount: false,
      refetchOnReconnect: false,
    },
  );

  const userProfile = userProfileFetched ?? initialUserProfile;

  const projectsProfileId = initialUserProfile.projectsProfile.id;
  const { data: profileStatistics } =
    trpc.projects.profile.dashboardStatistics.useQuery({
      projectsProfileId,
    });

  if (userProfile == null) {
    return notFound();
  }

  const { projectsProfile } = userProfile;

  if (projectsProfile == null) {
    return notFound();
  }

  return (
    <div className="flex flex-col gap-8">
      <div className="hidden items-center gap-6 md:flex">
        <Heading level="heading5">
          {isViewingOwnProfile ? (
            <FormattedMessage
              defaultMessage="My Profile"
              description="Title of Projects Profile page"
              id="JotoOX"
            />
          ) : (
            <FormattedMessage
              defaultMessage="Profile"
              description="Title of Projects Profile page"
              id="JQT5KD"
            />
          )}
        </Heading>
        {isViewingOwnProfile && (
          <Button
            href="/projects/profile/edit"
            icon={RiPencilLine}
            label={intl.formatMessage({
              defaultMessage: 'Edit profile',
              description: 'Label for edit projects profile button',
              id: '4s0s2J',
            })}
            variant="secondary"
          />
        )}
      </div>
      <ProjectsProfileInfo
        isViewingOwnProfile={isViewingOwnProfile}
        userProfile={{ ...userProfile, projectsProfile }}
      />
      <div className="flex flex-col gap-12">
        <ProjectsProfileStats
          codeReviews={profileStatistics?.codeReviews ?? 0}
          completedChallenges={profileStatistics?.completedChallenges ?? 0}
          submissionViews={profileStatistics?.submissionViews ?? 0}
          upvotes={profileStatistics?.upvotes ?? 0}
        />
        <ProjectsProfilePinnedSubmissions
          projectsProfileId={projectsProfileId}
        />
      </div>
      <div className="flex flex-col gap-8">
        <ProjectsProgressAndContributionsTabs
          baseUrl={`/projects/u/${initialUserProfile.username}`}
        />
        {children}
      </div>
    </div>
  );
}
