'use client';

import { notFound } from 'next/navigation';
import { RiPencilFill } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileInfo from '~/components/projects/profile/ProjectsProfileInfo';
import ProjectsProfilePinnedSubmissions from '~/components/projects/profile/ProjectsProfilePinnedSubmissions';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';

import type { Profile, ProjectsProfile } from '@prisma/client';

type Props = Readonly<{
  initialUserProfile: Profile &
    Readonly<{
      projectsProfile: ProjectsProfile;
    }>;
  isViewingOwnProfile: boolean;
}>;

export default function ProjectsProfilePage({
  initialUserProfile,
  isViewingOwnProfile,
}: Props) {
  const intl = useIntl();

  // For getting the updated profile data, when there is edit in profile edit page.
  const { data: userProfile } =
    trpc.projects.profile.projectsProfileGet.useQuery(undefined, {
      enabled: isViewingOwnProfile,
      initialData: initialUserProfile,
      refetchOnMount: false,
      refetchOnReconnect: false,
    });

  const projectsProfileId = initialUserProfile.projectsProfile.id;
  const { data: profileStatistics } =
    trpc.projects.profile.getDashboardStatisticsForProfile.useQuery({
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
      <div className="md:flex hidden items-center gap-6">
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
            icon={RiPencilFill}
            label={intl.formatMessage({
              defaultMessage: 'Edit',
              description: 'Label for edit projects profile button',
              id: 'nsdh11',
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
    </div>
  );
}
