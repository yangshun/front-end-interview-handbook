'use client';

import { FormattedMessage } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsCompleteProfileCard from './ProjectsCompleteProfileCard';
import ProjectsContinueProjectsSection from './ProjectsContinueProjectsSection';
import ProjectsRecommendedActionsSection from './ProjectsRecommendedActionsSection';
import ProjectsTrendingSubmissionsSection from './ProjectsTrendingSubmissionsSection';

export default function ProjectsDashboardPage() {
  const { data: profileStatistics } =
    trpc.projects.profile.getDashboardStatistics.useQuery();
  const { data: isNewToProjects } =
    trpc.projects.sessions.isNewToProjects.useQuery();
  const { data: profile } = trpc.projects.profile.projectsProfileGet.useQuery();

  return (
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
          <ProjectsCompleteProfileCard />
        </div>
      </div>
      <ProjectsProfileStats
        codeReviews={profileStatistics?.codeReviews ?? 0}
        completedChallenges={profileStatistics?.completedChallenges ?? 0}
        submissionViews={profileStatistics?.submissionViews ?? 0}
        upvotes={profileStatistics?.upvotes ?? 0}
      />
      {isNewToProjects ? (
        <ProjectsRecommendedActionsSection
          primaryMotivation={profile?.projectsProfile[0].primaryMotivation}
          secondaryMotivation={profile?.projectsProfile[0].secondaryMotivation}
        />
      ) : (
        <Section>
          <div className="lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid grid-rows-2 gap-3 md:gap-4 lg:gap-6">
            <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-6">
              <ProjectsContinueProjectsSection />
              <div className="flex flex-col gap-4">
                <Heading level="heading6">
                  <FormattedMessage
                    defaultMessage="Continue tracks and skills"
                    description="Title for Continue tracks and skills section on Projects dashboard page"
                    id="JIWdeN"
                  />
                </Heading>
                Placeholder for tracks and skills
              </div>
            </div>
            <ProjectsTrendingSubmissionsSection />
          </div>
        </Section>
      )}
      <Section>
        Placeholder for project progress and community contributions
      </Section>
    </div>
  );
}
