'use client';

import clsx from 'clsx';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import type { ProjectsChallengeItem } from '~/components/projects/details/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import ProjectsChallengeBriefProvidedResources from './ProjectsChallengeBriefProvidedResources';
import ProjectsChallengeBriefFAQSection from './ProjectsChallengeBriefSection';
import ProjectsChallengeBriefSupportSection from './ProjectsChallengeBriefSupportSection';
import ProjectsChallengeMdxContent from '../../common/ProjectsChallengeMdxContent';

type Props = Readonly<{
  project: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeBriefPage({ project }: Props) {
  const intl = useIntl();

  // TODO(projects): Compute these values
  const isProjectPremium = true;
  const isUserPremium = true;

  return (
    <BlurOverlay
      align="center"
      disableOverlay={isUserPremium || !isProjectPremium}
      overlay={
        <div className="flex flex-col items-center">
          <Heading level="heading5">
            <FormattedMessage
              defaultMessage="Premium Projects"
              description="Title for Premium Projects section on Projects project page"
              id="7vvXZb"
            />
          </Heading>
          <Text className="mt-4">
            <FormattedMessage
              defaultMessage="Purchase premium to unlock access to {premiumProjectCount}+ premium projects and tracks."
              description="Description for Premium Projects section on Projects project page"
              id="kNUgFO"
              values={{
                premiumProjectCount: 100,
              }}
            />
          </Text>
          <Button
            className="mt-7"
            label={intl.formatMessage({
              defaultMessage: 'View subscription plans',
              description:
                'Label for View subscription plans button on Projects project page',
              id: '9POdEK',
            })}
            variant="primary"
          />
        </div>
      }>
      <div className="flex flex-col items-stretch gap-16">
        <div className="grid grid-cols-1 gap-6 gap-y-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Project brief"
                description="Title for Project Brief section on Projects project page"
                id="S98EuF"
              />
            </Heading>
            <Section>
              <Prose textSize="sm">
                <ProjectsChallengeMdxContent
                  mdxCode={project.metadata.body.code}
                />
              </Prose>
            </Section>
          </div>
          <div className="flex flex-col gap-6">
            <img
              alt={project.metadata.title}
              className={clsx('h-[372px] w-full rounded-lg')}
              src={project.metadata.imageUrl}
            />
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Resources provided"
                description="Title for Assets Provided section on Projects project page"
                id="R+pt9h"
              />
            </Heading>
            <Section>
              <ProjectsChallengeBriefProvidedResources />
            </Section>
          </div>
        </div>
        <ProjectsChallengeBriefSupportSection />
        <ProjectsChallengeBriefFAQSection />
      </div>
    </BlurOverlay>
  );
}
