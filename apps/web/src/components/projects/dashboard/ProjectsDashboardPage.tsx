'use client';

import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import { trpc } from '~/hooks/trpc';

import ProjectsProfileStats from '~/components/projects/profile/ProjectsProfileStats';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';

import ProjectsCompleteProfileCard from './ProjectsCompleteProfileCard';

export default function ProjectsDashboardPage() {
  const intl = useIntl();

  const { data: profileStatistics } =
    trpc.projects.profile.getDashboardStatistics.useQuery();

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
        completedProjects={profileStatistics?.completedProjects ?? 0}
        submissionViews={profileStatistics?.submissionViews ?? 0}
        upvotes={profileStatistics?.upvotes ?? 0}
      />
      <Section>
        <div className="lg:grid-cols-2 lg:grid-rows-1 grid-cols-1 grid grid-rows-2 gap-3 md:gap-4 lg:gap-6">
          <div className="grid grid-cols-1 gap-3 md:gap-4 lg:gap-6">
            <div className="flex flex-col gap-4">
              <Heading level="heading6">
                <FormattedMessage
                  defaultMessage="Continue projects"
                  description="Title for Continue projects section on Projects dashboard page"
                  id="MgVI6L"
                />
              </Heading>
              <div>Placeholder for projects</div>
            </div>
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
          <div className="flex flex-col gap-4">
            <div className="flex justify-between">
              <Heading level="heading6">
                <FormattedMessage
                  defaultMessage="Top submissions you might learn from"
                  description="Title for Top submissions section on Projects dashboard page"
                  id="GRuYLb"
                />
              </Heading>
              <Button
                addonPosition="end"
                className="-me-3"
                href="/projects/submissions"
                icon={RiArrowRightLine}
                label={intl.formatMessage({
                  defaultMessage: 'See all',
                  description:
                    'Label for See all button on Projects dashboard page',
                  id: 'PHTFnA',
                })}
                size="sm"
                variant="tertiary"
              />
            </div>
            Placeholder for top submissions
          </div>
        </div>
      </Section>
      <Section>
        Placeholder for project progress and community contributions
      </Section>
    </div>
  );
}
