'use client';

import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import BlurOverlay from '~/components/common/BlurOverlay';
import ProjectsProgressAndContributionsTabs from '~/components/projects/common/progress-and-contributions/ProjectsProgressAndContributionsTabs';
import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
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
  const { data: userProfile } = trpc.projects.profile.get.useQuery();

  return (
    <BlurOverlay
      align="center"
      disableOverlay={userProfile != null}
      overlay={
        <div className="flex flex-col gap-y-7 items-center max-w-lg mx-auto text-center">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Create a free account to track your progress"
              description="Title for overlay on Projects dashboard page"
              id="nRFkBV"
            />
          </Heading>
          <Button
            href="/projects/onboarding"
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
          <div className="flex flex-col lg:flex-row lg:justify-between relative gap-6">
            <Heading level="heading5">
              <FormattedMessage
                defaultMessage="Dashboard"
                description="Title of Projects dashboard page"
                id="UTPE3y"
              />
            </Heading>
            <div className="lg:absolute right-0 -top-8 z-10">
              <ProjectsDashboardCompleteProfileCard />
            </div>
          </div>
          <Section>
            <ProjectsProfileStats
              codeReviews={profileStatistics?.codeReviews ?? 232}
              completedChallenges={
                profileStatistics?.completedChallenges ?? 5653
              }
              submissionViews={profileStatistics?.submissionViews ?? 4}
              upvotes={profileStatistics?.upvotes ?? 842}
            />
          </Section>
        </div>
        <Section>
          {userProfile && !startedBefore ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 grid-rows-2 lg:grid-rows-1 gap-x-3 md:gap-x-4 lg:gap-x-6 gap-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-x-3 md:gap-x-4 lg:gap-x-6 gap-y-6">
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
              <ProjectsProgressAndContributionsTabs baseUrl="/projects/dashboard" />
              {children}
            </div>
          )}
        </Section>
      </div>
    </BlurOverlay>
  );
}
