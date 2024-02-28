'use client';

import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';

import BlurOverlay from '~/components/common/BlurOverlay';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import ProjectsProfileTabs from '~/components/projects/profile/ProjectsProfileTabs';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsDashboardCompleteProfileCard from './ProjectsDashboardCompleteProfileCard';
import ProjectsDashboardContinueProjectsSection from './ProjectsDashboardContinueProjectsSection';
import ProjectsDashboardRecommendedActionsSection from './ProjectsDashboardRecommendedActionsSection';
import ProjectsDashboardTrackAndSkillsSection from './ProjectsDashboardTrackAndSkillsSection';
import ProjectsDashboardTrendingSubmissionsSection from './ProjectsDashboardTrendingSubmissionsSection';

type Props = Readonly<{
  children: React.ReactNode;
}>;

export default function ProjectsDashboardPage({ children }: Props) {
  const intl = useIntl();

  const { data: profileStatistics } =
    trpc.projects.profile.dashboardStatisticsSelf.useQuery();
  const { data: startedBefore } =
    trpc.projects.sessions.startedBefore.useQuery();
  const { data: userProfile } = trpc.projects.profile.viewer.useQuery();
  const { signInUpHref } = useAuthSignInUp();

  return (
    <BlurOverlay
      align="center"
      disableOverlay={userProfile?.projectsProfile != null}
      overlay={
        <div className="mx-auto flex max-w-xl flex-col items-center gap-y-6 text-center">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Create a free account to track your progress"
              description="Title for overlay on Projects dashboard page"
              id="nRFkBV"
            />
          </Heading>
          <Button
            href={signInUpHref()}
            icon={RiArrowRightLine}
            label={intl.formatMessage({
              defaultMessage: 'Get started',
              description:
                'Label for Get started button on Projects dashboard page',
              id: 'iCm44V',
            })}
            size="lg"
            variant="primary"
          />
        </div>
      }>
      <div className="flex flex-col gap-16">
        <div className="flex flex-col gap-8">
          <div className="relative flex flex-col gap-6 lg:flex-row lg:justify-between">
            <Heading level="heading5">
              <FormattedMessage
                defaultMessage="Dashboard"
                description="Title of Projects dashboard page"
                id="UTPE3y"
              />
            </Heading>
            <div className="-top-8 right-0 z-10 lg:absolute">
              <ProjectsDashboardCompleteProfileCard />
            </div>
          </div>
          <Section>
            {profileStatistics ? (
              <ProjectsProfileStats
                codeReviews={profileStatistics?.codeReviews}
                completedChallenges={profileStatistics?.completedChallenges}
                submissionViews={profileStatistics?.submissionViews ?? 0}
                upvotes={profileStatistics?.upvotes}
              />
            ) : (
              // Fake data for blurred overlay
              <ProjectsProfileStats
                codeReviews={232}
                completedChallenges={5653}
                submissionViews={4}
                upvotes={842}
              />
            )}
          </Section>
        </div>
        <Section>
          {userProfile && startedBefore ? (
            <div className="grid grid-cols-1 grid-rows-2 gap-x-3 gap-y-6 md:gap-x-4 lg:grid-cols-2 lg:grid-rows-1 lg:gap-x-6">
              <div className="grid grid-cols-1 gap-x-3 gap-y-6 md:grid-cols-2 md:gap-x-4 lg:grid-cols-1 lg:gap-x-6">
                <ProjectsDashboardContinueProjectsSection />
                <ProjectsDashboardTrackAndSkillsSection />
              </div>
              <ProjectsDashboardTrendingSubmissionsSection />
            </div>
          ) : (
            <ProjectsDashboardRecommendedActionsSection
              motivations={userProfile?.projectsProfile?.motivations ?? []}
            />
          )}
          {userProfile && (
            <div className="flex flex-col gap-8">
              <ProjectsProfileTabs
                baseUrl="/projects/dashboard"
                showStartNewProject={true}
              />
              {children}
            </div>
          )}
        </Section>
      </div>
    </BlurOverlay>
  );
}
