'use client';

import { allProjectsChallengeBriefs } from 'contentlayer/generated';
import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import ProjectsChallengeBriefFAQSection from './ProjectsChallengeBriefFAQSection';
import ProjectsChallengeBriefImageCarousel from './ProjectsChallengeBriefImageCarousel';
import ProjectsChallengeBriefProvidedResources from './ProjectsChallengeBriefProvidedResources';
import ProjectsChallengeBriefSupportSection from './ProjectsChallengeBriefSupportSection';
import ProjectsChallengeMdxContent from '../../common/ProjectsChallengeMdxContent';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
}>;

export default function ProjectsChallengeBriefPage({ challenge }: Props) {
  const intl = useIntl();
  const brief = allProjectsChallengeBriefs.find((challengeBrief) => {
    return challengeBrief.slug === challenge.metadata.slug;
  });

  if (!brief) {
    return null;
  }

  // TODO(projects): Compute these values
  const isProjectPremium = true;
  const isUserPremium = true;

  // TODO(projects): Add real images url
  const images = [
    `https://source.unsplash.com/random/640x360?random=${Math.random()}`,
    `https://source.unsplash.com/random/640x560?random=${Math.random()}`,
    `https://source.unsplash.com/random/340x260?random=${Math.random()}`,
    `https://source.unsplash.com/random/140x360?random=${Math.random()}`,
    `https://source.unsplash.com/random/940x360?random=${Math.random()}`,
    `https://source.unsplash.com/random/240x160?random=${Math.random()}`,
  ];

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
                <ProjectsChallengeMdxContent mdxCode={brief.body.code} />
              </Prose>
            </Section>
          </div>
          <div className="flex flex-col gap-6">
            <ProjectsChallengeBriefImageCarousel images={images} />
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
