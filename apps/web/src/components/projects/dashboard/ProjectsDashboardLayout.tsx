'use client';

import clsx from 'clsx';
import { RiArrowRightLine } from 'react-icons/ri';

import { trpc } from '~/hooks/trpc';
import { useAuthSignInUp } from '~/hooks/user/useAuthFns';
import { SCROLL_HASH_PROJECTS_DASHBOARD } from '~/hooks/useScrollToHash';

import BlurOverlay from '~/components/common/BlurOverlay';
import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsProfileCategoryTabs from '~/components/projects/profile/ProjectsProfileCategoryTabs';
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
  viewer: {
    id: string;
  } | null;
}>;

export default function ProjectsDashboardLayout({ children, viewer }: Props) {
  const intl = useIntl();

  const { data: profileStatistics, isLoading: isProfileStatisticsLoading } =
    trpc.projects.profile.dashboardStatisticsSelf.useQuery();
  const { data: startedBefore } =
    trpc.projects.sessions.startedBefore.useQuery();
  const { signInUpHref } = useAuthSignInUp();

  const baseUrl = '/projects/dashboard';

  const getProjectsProfileStats = () => {
    // If viewer is null then we need to show overlay and fake data
    if (viewer === null) {
      return (
        <ProjectsProfileStats
          codeReviews={232}
          completedChallenges={5653}
          isViewingOwnProfile={false}
          submissionViews={4}
          upvotes={842}
        />
      );
    }
    // If profile stats is loading then we show `-` as loading state
    if (isProfileStatisticsLoading) {
      return (
        <ProjectsProfileStats
          codeReviews={0}
          completedChallenges={0}
          isViewingOwnProfile={true} // This is always true as you can get to this page if you are viewing your own profile
          submissionViews={0}
          upvotes={0}
        />
      );
    }

    return (
      <ProjectsProfileStats
        codeReviews={profileStatistics?.codeReviews}
        completedChallenges={profileStatistics?.completedChallenges}
        isViewingOwnProfile={true} // This is always true as you can get to this page if you are viewing your own profile
        submissionViews={profileStatistics?.submissionViews ?? 0}
        upvotes={profileStatistics?.upvotes}
      />
    );
  };

  return (
    <BlurOverlay
      align="center"
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
            suppressHydrationWarning={true}
            variant="primary"
          />
        </div>
      }
      showOverlay={viewer == null}>
      <div className="flex flex-col gap-16" id={SCROLL_HASH_PROJECTS_DASHBOARD}>
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
          <Section>{getProjectsProfileStats()}</Section>
        </div>
        <Section>
          {viewer && startedBefore ? (
            <div
              className={clsx(
                'grid grid-cols-1 md:grid-cols-2',
                'gap-x-3 gap-y-10 md:gap-x-4 lg:gap-x-6',
              )}>
              <div
                className={clsx(
                  'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1',
                  'gap-x-3 gap-y-10 md:gap-x-4 lg:gap-x-6',
                )}>
                <ProjectsDashboardContinueProjectsSection />
                <ProjectsDashboardTrackAndSkillsSection />
              </div>
              <ProjectsDashboardTrendingSubmissionsSection />
            </div>
          ) : (
            <ProjectsDashboardRecommendedActionsSection />
          )}
          {viewer && (
            <div className="flex flex-col gap-8">
              <ProjectsProfileCategoryTabs
                baseUrl={baseUrl}
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
