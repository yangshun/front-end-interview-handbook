import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import type { OnboardingProfileFormValues } from './ProjectsOnboardingProfilePage';

export type OnboardingProfilePage2FormValues = Readonly<{
  bio: string;
  linkGitHub: string;
  linkLinkedIn: string;
  linkPersonalWebsite: string;
}>;

export default function ProjectsOnboardingProfilePage1() {
  const intl = useIntl();

  const { control } = useFormContext<OnboardingProfileFormValues>();

  return (
    <>
      <div className="mt-8 flex justify-between gap-2">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Set up your profile"
            description="Title for Projects profile onboarding page"
            id="GxJeqH"
          />
        </Heading>
        <Button
          className="-me-5"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Skip for now',
            description:
              'Label for "Skip for now" button on Projects profile onboarding page',
            id: 'fs9YFE',
          })}
          size="md"
          variant="tertiary"
        />
      </div>
      <div className="mt-6 flex flex-col gap-y-16">
        <div className="relative">
          <ProjectsReputationCountIncreaseTag
            className="absolute end-0 top-0"
            repCount={25}
            variant="filled"
          />
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <TextArea
                description={intl.formatMessage({
                  defaultMessage: 'Bio description',
                  description:
                    'Description for Biography input on Projects profile onboarding page',
                  id: 'hJzsEb',
                })}
                label={intl.formatMessage({
                  defaultMessage: 'Bio',
                  description:
                    'Label for Biography input on Projects profile onboarding page',
                  id: 'ZNPYCk',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage:
                    'Tell us anything - about your journey as a front end developer, your goals and next steps, or how you want to connect with others',
                  description:
                    'Placeholder for Biography input on Projects profile onboarding page',
                  id: 'jeX0Hi',
                })}
                {...field}
              />
            )}
          />
        </div>
        <div className="flex flex-col gap-y-6">
          <Text weight="bold">
            <FormattedMessage
              defaultMessage="Social links"
              description="Label for Social Links section of Projects profile onboarding page"
              id="jCp/VW"
            />
          </Text>
          <div className="space-y-4">
            <div className="relative">
              <ProjectsReputationCountIncreaseTag
                className="absolute end-0 top-0"
                repCount={25}
                variant="filled"
              />
              <Controller
                control={control}
                name="linkGitHub"
                render={({ field }) => (
                  <TextInput
                    description={intl.formatMessage({
                      defaultMessage: 'GitHub link description',
                      description:
                        'Description for GitHub link input on Projects profile onboarding page',
                      id: 'c9Jgo2',
                    })}
                    label={intl.formatMessage({
                      defaultMessage: 'GitHub (optional)',
                      description:
                        'Label for GitHub link input on Projects profile onboarding page',
                      id: 'f6GjzW',
                    })}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="relative">
              <ProjectsReputationCountIncreaseTag
                className="absolute end-0 top-0"
                repCount={25}
                variant="filled"
              />
              <Controller
                control={control}
                name="linkLinkedIn"
                render={({ field }) => (
                  <TextInput
                    description={intl.formatMessage({
                      defaultMessage: 'LinkedIn link description',
                      description:
                        'Description for LinkedIn link input on Projects profile onboarding page',
                      id: '7GfgZR',
                    })}
                    label={intl.formatMessage({
                      defaultMessage: 'LinkedIn (optional)',
                      description:
                        'Label for LinkedIn link input on Projects profile onboarding page',
                      id: 'l1pTwU',
                    })}
                    {...field}
                  />
                )}
              />
            </div>
            <div className="relative">
              <ProjectsReputationCountIncreaseTag
                className="absolute end-0 top-0"
                repCount={25}
                variant="filled"
              />
              <Controller
                control={control}
                name="linkPersonalWebsite"
                render={({ field }) => (
                  <TextInput
                    description={intl.formatMessage({
                      defaultMessage: 'Personal Website link description',
                      description:
                        'Description for Personal Website link input on Projects profile onboarding page',
                      id: 'wjcqDA',
                    })}
                    label={intl.formatMessage({
                      defaultMessage: 'Personal Website (optional)',
                      description:
                        'Label for Personal Website link input on Projects profile onboarding page',
                      id: 'rAAfhQ',
                    })}
                    {...field}
                  />
                )}
              />
            </div>
          </div>
        </div>
        <Button
          className="self-end"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Get started',
            description:
              'Label for Get Started button on Projects profile onboarding page',
            id: 'iBfH9v',
          })}
          size="lg"
          variant="primary"
        />
      </div>
    </>
  );
}
