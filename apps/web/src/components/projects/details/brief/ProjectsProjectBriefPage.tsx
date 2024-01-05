'use client';

import { FormattedMessage, useIntl } from 'react-intl';

import BlurOverlay from '~/components/common/BlurOverlay';
import ProjectsAssetProvidedHtml from '~/components/projects/details/assets/ProjectsAssetProvidedHtml';
import ProjectsAssetProvidedImageAssets from '~/components/projects/details/assets/ProjectsAssetProvidedImageAssets';
import ProjectsAssetProvidedJpeg from '~/components/projects/details/assets/ProjectsAssetProvidedJpeg';
import ProjectsAssetProvidedReadme from '~/components/projects/details/assets/ProjectsAssetProvidedReadme';
import ProjectsAssetProvidedStyleGuide from '~/components/projects/details/assets/ProjectsAssetProvidedStyleGuide';
import type { ProjectsProjectItem } from '~/components/projects/details/types';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Prose from '~/components/ui/Prose';
import Text from '~/components/ui/Text';

import ProjectsProjectBriefFAQSection from './ProjectsProjectBriefSection';
import ProjectsProjectBriefSupportSection from './ProjectsProjectBriefSupportSection';

type Props = Readonly<{
  project: ProjectsProjectItem;
}>;

export default function ProjectsProjectBriefPage({ project }: Props) {
  const intl = useIntl();

  // TODO(projects): Compute these values
  const isProjectPremium = true;
  const isUserPremium = true;

  const projectBrief = (
    <Prose textSize="sm">
      <p>
        Your challenge is to build out this newsletter form and get it looking
        as close to the design as possible. You can use any tools you like to
        help you complete the challenge. So if you've got something you'd like
        to practice, feel free to give it a go. Your challenge is to build out
        this newsletter form and get it looking as close to the design as
        possible. You can use any tools you like to help you complete the
        challenge. So if you've got something you'd like to practice, feel free
        to give it a go.
      </p>
      <p>Your users should be able to:</p>
      <ul>
        <li>Add their email and submit the form</li>
        <li>
          See a success message with their email after successfully submitting
          the form
        </li>
        <li>
          See form validation messages if:{' '}
          <ul>
            <li>The field is left empty</li>
            <li>The email address is not formatted correctly</li>
          </ul>
        </li>
        <li>
          View the optimal layout for the interface depending on their device's
          screen size
        </li>
        <li>
          See hover and focus states for all interactive elements on the page{' '}
        </li>
      </ul>
      <p>
        Your challenge is to build out this newsletter form and get it looking
        as close the design as possible. You can use any tools you like to help
        you complete the challenge. So if you've got something you'd like to
        practice, feel free to give it a go. Your challenge is to build out this
        newsletter form and get it looking as close to the design as possible.
        You can use any tools you like to help you complete the challenge. So if
        you've got something you'd like to practice, feel free to give it a go.
      </p>
      <p>Your users should be able to: </p>
      <ul>
        <li>Add their email and submit the form</li>
        <li>
          See a success message with their email after successfully submitting
          the form
        </li>
      </ul>
    </Prose>
  );

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
              <Text color="secondary" size="body2">
                {projectBrief}
              </Text>
            </Section>
          </div>
          <div className="flex flex-col gap-6">
            <div className="bg-red h-[372px] w-full rounded-lg" />
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
        <ProjectsProjectBriefSupportSection />
        <ProjectsProjectBriefFAQSection />
      </div>
    </BlurOverlay>
  );
}
