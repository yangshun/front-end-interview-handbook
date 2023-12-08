'use client';

import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import ProjectsAssetProvidedHtml from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedHtml';
import ProjectsAssetProvidedImageAssets from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedImageAssets';
import ProjectsAssetProvidedJpeg from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedJpeg';
import ProjectsAssetProvidedReadme from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedReadme';
import ProjectsAssetProvidedStyleGuide from '~/components/projects/projects/assets-provided/ProjectsAssetProvidedStyleGuide';
import type { ProjectsProject } from '~/components/projects/projects/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';

type Props = Readonly<{
  project: ProjectsProject;
}>;

type SupportItem = Readonly<{
  description: string;
  key: string;
  title: string;
}>;

function useSupportItems() {
  const intl = useIntl();

  const supportItems: Array<SupportItem> = [
    {
      description: intl.formatMessage({
        defaultMessage:
          'Development guides written & curated by Sr engineers at Big tech, such as:',
        description:
          'Description for "Official guides & resources" item in Expected Support section on Projects project page',
        id: 'abJ+kd',
      }),
      key: 'official-guides',
      title: intl.formatMessage({
        defaultMessage: 'Official guides & resources',
        description:
          'Label for "Official guides & resources" item in Expected Support section on Projects project page',
        id: 'uKEj2Z',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'We recommend well-rated submissions using the same stack for your reference',
        description:
          'Description for "Learn from good code" item in Expected Support section on Projects project page',
        id: 'CCiMOz',
      }),
      key: 'learn-from-good-code',
      title: intl.formatMessage({
        defaultMessage: 'Learn from good code',
        description:
          'Label for "Learn from good code" item in Expected Support section on Projects project page',
        id: 'jz6W//',
      }),
    },
    {
      description: intl.formatMessage({
        defaultMessage:
          'Have any doubts or need help? Ask in the community and discuss with others.',
        description:
          'Description for "Ask any questions in community" item in Expected Support section on Projects project page',
        id: 'Lwa7+3',
      }),
      key: 'ask-any-questions-in-community',
      title: intl.formatMessage({
        defaultMessage: 'Ask any questions in community',
        description:
          'Label for "Ask any questions in community" item in Expected Support section on Projects project page',
        id: 'rH3Vfz',
      }),
    },
  ];

  return supportItems;
}

export default function ProjectsProjectBriefPage({ project }: Props) {
  const intl = useIntl();
  const supportItems = useSupportItems();

  // TODO(projects): Compute these values
  const isProjectPremium = true;
  const isUserPremium = false;

  const projectBrief =
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo.';

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
      <div className="flex flex-col items-stretch">
        <div className="grid grid-cols-1 gap-x-12 gap-y-12 lg:grid-cols-2">
          <div className="flex flex-col gap-6">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Project Brief"
                description="Title for Project Brief section on Projects project page"
                id="B4Jykm"
              />
            </Heading>
            <Section>
              <div className="bg-red h-[372px] w-full rounded-lg" />
              <Text color="secondary" size="body2">
                {projectBrief}
              </Text>
            </Section>
          </div>
          <div className="flex flex-col gap-6">
            <Heading level="heading6">
              <FormattedMessage
                defaultMessage="Assets provided"
                description="Title for Assets Provided section on Projects project page"
                id="Zcjig8"
              />
            </Heading>
            <Section>
              <div className="flex flex-col items-stretch gap-4">
                <ProjectsAssetProvidedJpeg />
                <ProjectsAssetProvidedStyleGuide />
                <ProjectsAssetProvidedImageAssets />
                <ProjectsAssetProvidedReadme />
                <ProjectsAssetProvidedHtml />
              </div>
            </Section>
          </div>
        </div>
        <div className="mt-16 flex flex-col gap-6">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Support you can expect"
              description="Title for Expected Support section on Projects project page"
              id="+y/iOY"
            />
          </Heading>
          <Section>
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3">
              {supportItems.map(
                ({ key, title: itemTitle, description: itemDescription }) => (
                  <div key={key} className="flex flex-col">
                    <Text weight="bold">{itemTitle}</Text>
                    <div className="mt-4 flex flex-col-reverse gap-y-4 lg:mt-3 lg:flex-col lg:gap-y-6">
                      <Text color="secondary" size="body2">
                        {itemDescription}
                      </Text>
                      <div className="bg-red h-[200px] w-full rounded-lg" />
                    </div>
                  </div>
                ),
              )}
            </div>
          </Section>
        </div>
        <div className="mt-16">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="FAQ"
              description="Title for FAQ section on Projects project page"
              id="6U52IB"
            />
          </Heading>
          {/* TODO: Replace below with FAQ accordion */}
          <div className="bg-red mt-6 h-[200px] w-full rounded-lg" />
        </div>
      </div>
    </BlurOverlay>
  );
}
