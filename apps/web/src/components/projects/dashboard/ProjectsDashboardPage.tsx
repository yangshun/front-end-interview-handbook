'use client';

import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
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
  const { data: profileStatistics } =
    trpc.projects.profile.getDashboardStatistics.useQuery();
  const { data: isNewToProjects } =
    trpc.projects.sessions.isNewToProjects.useQuery();
  const { data: userProfile } =
    trpc.projects.profile.projectsProfileGet.useQuery();

  return (
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
        <ProjectsProfileStats
          codeReviews={profileStatistics?.codeReviews ?? 0}
          completedChallenges={profileStatistics?.completedChallenges ?? 0}
          submissionViews={profileStatistics?.submissionViews ?? 0}
          upvotes={profileStatistics?.upvotes ?? 0}
        />
      </div>
      {isNewToProjects ? (
        <ProjectsDashboardRecommendedActionsSection
          primaryMotivation={userProfile?.projectsProfile?.primaryMotivation}
          secondaryMotivation={
            userProfile?.projectsProfile?.secondaryMotivation
          }
        />
      ) : (
        <Section>
          <div className="lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid grid-rows-2 gap-y-6 gap-x-3 md:gap-x-4 lg:gap-x-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-y-6 gap-x-3 md:gap-x-4 lg:gap-x-6">
              <ProjectsDashboardContinueProjectsSection />
              <ProjectsDashboardTrackAndSkillsSection />
            </div>
            <ProjectsDashboardTrendingSubmissionsSection />
          </div>
        </Section>
      )}
      {children}
    </div>
  );
}
