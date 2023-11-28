'use client';

import clsx from 'clsx';
import React, { useState } from 'react';
import {
  Controller,
  FormProvider,
  useForm,
  useFormContext,
} from 'react-hook-form';
import {
  RiArrowLeftLine,
  RiArrowRightLine,
  RiCheckboxCircleFill,
  RiNodeTree,
  RiParentLine,
  RiQuestionLine,
  RiRocketLine,
  RiSparklingLine,
  RiStarLine,
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import {
  themeBackgroundLayerEmphasized,
  themeCardBackgroundColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

type ReasonType = 'primary' | 'secondary';
type ReasonValue =
  | 'beginner'
  | 'experienced'
  | 'mentor-others'
  | 'other'
  | 'portfolio'
  | 'side-projects';

type ReasonOption = {
  content: React.ReactNode;
  icon: (props: React.ComponentProps<'svg'>) => JSX.Element;
  id: ReasonValue;
};

function useReasonOptions() {
  const reasonOptions: Array<ReasonOption> = [
    {
      content: (
        <FormattedMessage
          defaultMessage="I'm a <bold>beginner</bold> and want to learn skills for practical front end development"
          description='Label for "Beginner" onboarding option in Projects'
          id="cJY5Ir"
          values={{
            bold: (chunks) => (
              <Text display="inline" weight="bold">
                {chunks}
              </Text>
            ),
          }}
        />
      ),
      icon: RiRocketLine,
      id: 'beginner',
    },

    {
      content: (
        <FormattedMessage
          defaultMessage="I'm <bold>experienced</bold> and here to bridge some skill gaps in modern front end or full stack"
          description='Label for "Experienced" onboarding option in Projects'
          id="uCyL/V"
          values={{
            bold: (chunks) => (
              <Text display="inline" weight="bold">
                {chunks}
              </Text>
            ),
          }}
        />
      ),
      icon: RiNodeTree,
      id: 'experienced',
    },
    {
      content: (
        <FormattedMessage
          defaultMessage="I'm here to build my <bold>portfolio</bold>"
          description='Label for "Portfolio" onboarding option in Projects'
          id="k08Rfb"
          values={{
            bold: (chunks) => (
              <Text display="inline" weight="bold">
                {chunks}
              </Text>
            ),
          }}
        />
      ),
      icon: RiSparklingLine,
      id: 'portfolio',
    },
    {
      content: (
        <FormattedMessage
          defaultMessage="I'm here to build my <bold>side projects</bold>"
          description='Label for "Side projects" onboarding option in Projects'
          id="6nt/n6"
          values={{
            bold: (chunks) => (
              <Text display="inline" weight="bold">
                {chunks}
              </Text>
            ),
          }}
        />
      ),
      icon: RiStarLine,
      id: 'side-projects',
    },
    {
      content: (
        <FormattedMessage
          defaultMessage="I want to help <bold>mentor others</bold>"
          description='Label for "Mentor others" onboarding option in Projects'
          id="13CKZ1"
          values={{
            bold: (chunks) => (
              <Text display="inline" weight="bold">
                {chunks}
              </Text>
            ),
          }}
        />
      ),
      icon: RiParentLine,
      id: 'mentor-others',
    },
    {
      content: (
        <FormattedMessage
          defaultMessage="Other"
          description='Label for "Other" onboarding option in Projects'
          id="Zdojj9"
        />
      ),
      icon: RiQuestionLine,
      id: 'other',
    },
  ];

  return reasonOptions;
}

function ReasonList({
  name,
  reasonOptions,
  onChange,
}: {
  name: ReasonType;
  onChange: (value: ReasonValue | null) => void;
  reasonOptions: Array<ReasonOption>;
}) {
  const { control, watch, setValue } =
    useFormContext<OnboardingReasonFormValues>();
  const valueKey = `${name}.type` as const;
  const value = watch(valueKey);

  return (
    <div className="flex flex-col items-stretch gap-6">
      {reasonOptions.map(({ id, icon: Icon, content }) => (
        <button
          key={id}
          aria-checked={id === value}
          className={clsx(
            'relative rounded-lg border px-6 py-4',
            themeCardBackgroundColor,
            value === id
              ? 'border-brand'
              : ['glassbox hover:border-brand/50 border-transparent'],
            'focus:outline-brand outline-offset-8',
          )}
          role="checkbox"
          type="button"
          onClick={() => {
            setValue(valueKey, value === id ? null : id);
            onChange(value === id ? null : id);
          }}>
          <div className="flex items-start gap-4 rounded-md">
            <div
              className={clsx(
                'rounded-md p-1',
                themeBackgroundLayerEmphasized,
              )}>
              <Icon className={clsx('h-4 w-4', themeTextSecondaryColor)} />
            </div>
            <Text className="flex-1 text-start" color="secondary">
              {content}
            </Text>
            {value === id && (
              <RiCheckboxCircleFill
                aria-hidden={true}
                className="text-brand absolute end-1 top-1 h-4 w-4"
              />
            )}
          </div>
        </button>
      ))}
      {value === 'other' && (
        <Controller
          control={control}
          name={`${name}.otherValue` as const}
          render={({ field }) => (
            <TextArea
              isLabelHidden={true}
              label="Your motivations"
              placeholder="Tell us about your motivations"
              {...field}
            />
          )}
        />
      )}
    </div>
  );
}

type OnboardingReasonFormValues = Record<
  ReasonType,
  {
    otherValue: string;
    type: ReasonValue | null;
  }
>;

export default function ProjectsOnboardingReasonPage() {
  const intl = useIntl();
  const reasonOptions = useReasonOptions();

  const methods = useForm<OnboardingReasonFormValues>({
    defaultValues: {
      primary: {
        otherValue: '',
        type: null,
      },
      secondary: {
        otherValue: '',
        type: null,
      },
    },
  });
  const [reasonType, setReasonType] = useState<ReasonType>('primary');

  return (
    <FormProvider {...methods}>
      <main>
        <Container
          className="mt-8 flex flex-col items-center pb-24"
          variant="2xl">
          <div className="flex flex-col items-stretch gap-4">
            <Heading level="heading5">
              <FormattedMessage
                defaultMessage="Welcome to GreatFrontEnd Projects!"
                description="Title for Projects onboarding page"
                id="GPp0wf"
              />
            </Heading>
            <Text color="secondary">
              <FormattedMessage
                defaultMessage="Tell us why you’re here so that we can customize your experience"
                description="Subtitle for Projects onboarding page"
                id="IlQ38m"
              />
            </Text>
          </div>
          <Section>
            <div className="-ms-4 mb-4 mt-10 flex justify-between self-stretch">
              <div className="flex">
                <Button
                  className={clsx(reasonType === 'primary' && '!text-brand')}
                  label={intl.formatMessage({
                    defaultMessage: 'Primary reason',
                    description:
                      'Label for "Primary reason" button on Sign Up Reason section of Projects onboarding page',
                    id: 'LxlUHa',
                  })}
                  size="lg"
                  variant="tertiary"
                  onClick={() => {
                    setReasonType('primary');
                  }}
                />
                <Button
                  className={clsx(reasonType === 'secondary' && '!text-brand')}
                  label={intl.formatMessage({
                    defaultMessage: 'Secondary reason',
                    description:
                      'Label for "Secondary reason" button on Sign Up Reason section of Projects onboarding page',
                    id: 'hdlJES',
                  })}
                  size="lg"
                  variant="tertiary"
                  onClick={() => {
                    setReasonType('secondary');
                  }}
                />
              </div>
              {reasonType === 'secondary' && (
                <Button
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Skip for now',
                    description:
                      'Label for "Skip" button on Sign Up Reason section of Projects onboarding page',
                    id: '8mCs6b',
                  })}
                  size="lg"
                  variant="secondary"
                />
              )}
            </div>
            <ReasonList
              key={reasonType}
              name={reasonType}
              reasonOptions={reasonOptions}
              onChange={() => {
                if (reasonType === 'primary') {
                  setReasonType('secondary');
                }
              }}
            />
            {reasonType === 'secondary' && (
              <div className="mt-8 flex justify-between gap-2 self-stretch">
                <Button
                  addonPosition="start"
                  icon={RiArrowLeftLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Back',
                    description:
                      'Label for "Back" button on Sign Up Reason section of Projects onboarding page',
                    id: 'KIUB2O',
                  })}
                  size="lg"
                  variant="secondary"
                  onClick={() => {
                    setReasonType('primary');
                  }}
                />
                <Button
                  icon={RiArrowRightLine}
                  label={intl.formatMessage({
                    defaultMessage: 'Next',
                    description:
                      'Label for "Next" button on Sign Up Reason section of Projects onboarding page',
                    id: '6ntGyS',
                  })}
                  size="lg"
                  variant="secondary"
                />
              </div>
            )}
          </Section>
        </Container>
      </main>
    </FormProvider>
  );
}
