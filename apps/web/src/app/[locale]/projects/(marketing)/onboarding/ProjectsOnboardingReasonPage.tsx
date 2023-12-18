'use client';

import clsx from 'clsx';
import React, { useEffect, useState } from 'react';
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
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import {
  themeBackgroundLayerEmphasized,
  themeCardBackgroundColor,
  themeElementBorderColor,
  themeTextBrandColor,
  themeTextDisabledColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nRouter } from '~/next-i18nostic/src';

import { zodResolver } from '@hookform/resolvers/zod';

const reasonValue = z.enum([
  'beginner',
  'experienced',
  'mentor-others',
  'other',
  'portfolio',
  'side-projects',
]);

type ReasonType = 'primary' | 'secondary';
type ReasonValue = z.infer<typeof reasonValue>;

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

function useOnboardingReasonSchema() {
  const intl = useIntl();

  const motivationSchema = z.union([
    z
      .object({
        otherValue: z.string(),
        type: reasonValue.exclude(['other']).nullable(),
      })
      .transform(({ type }) => type),
    z
      .object({
        otherValue: z.string().min(1, {
          message: intl.formatMessage({
            defaultMessage: 'Please enter your motivations',
            description:
              'Error message for empty "Other" onboarding option in Projects',
            id: 'zACRRV',
          }),
        }),
        type: reasonValue.extract(['other']),
      })
      .transform(({ otherValue }) => otherValue),
  ]);

  return z.object({
    primary: motivationSchema.transform((motivation) =>
      motivation === null ? z.NEVER : motivation,
    ),
    secondary: motivationSchema,
  });
}

function ReasonList({
  name,
  reasonOptions,
  previousValue,
  onChange,
}: {
  name: ReasonType;
  onChange: (value: ReasonValue | null) => void;
  previousValue?: ReasonValue | null;
  reasonOptions: Array<ReasonOption>;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<OnboardingReasonFormValues>();
  const valueKey = `${name}.type` as const;
  const value = watch(valueKey);

  return (
    <div className="flex flex-col items-stretch gap-6">
      {reasonOptions.map(({ id, icon: Icon, content }) => {
        const isPreviousValue = previousValue === id;
        const disabled = isPreviousValue && id !== 'other';
        const selected = value === id;

        return (
          <button
            key={id}
            aria-checked={selected}
            className={clsx(
              'relative rounded-lg border px-6 py-4',
              themeCardBackgroundColor,
              selected
                ? 'border-brand'
                : ['glassbox hover:border-brand/50 border-transparent'],
              'focus:outline-brand outline-offset-8',
              disabled && themeElementBorderColor,
            )}
            disabled={disabled}
            role="checkbox"
            type="button"
            onClick={() => {
              setValue(valueKey, selected ? null : id);
              onChange(selected ? null : id);
            }}>
            <div className="flex items-start gap-4 rounded-md">
              <div
                className={clsx(
                  'rounded-md p-1',
                  themeBackgroundLayerEmphasized,
                )}>
                <Icon
                  className={clsx(
                    'h-4 w-4',
                    disabled ? themeTextDisabledColor : themeTextSecondaryColor,
                  )}
                />
              </div>
              <Text
                className={clsx('flex-1 text-start', disabled && 'opacity-30')}
                color="secondary">
                {content}
              </Text>
              {selected && (
                <RiCheckboxCircleFill
                  aria-hidden={true}
                  className={clsx(
                    'absolute end-1 top-1 h-4 w-4',
                    themeTextBrandColor,
                  )}
                />
              )}
              {!selected && isPreviousValue && (
                <RiCheckboxCircleFill
                  aria-hidden={true}
                  className={clsx(
                    'absolute end-1 top-1 h-4 w-4',
                    themeTextDisabledColor,
                  )}
                />
              )}
            </div>
          </button>
        );
      })}
      {value === 'other' && (
        <Controller
          control={control}
          name={`${name}.otherValue` as const}
          render={({ field }) => (
            <TextArea
              autoFocus={true}
              errorMessage={errors[name]?.otherValue?.message}
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

type OnboardingProfileFormTransformedValues = z.infer<
  ReturnType<typeof useOnboardingReasonSchema>
>;

export default function ProjectsOnboardingReasonPage() {
  const router = useI18nRouter();
  const intl = useIntl();
  const onboardingReasonSchema = useOnboardingReasonSchema();
  const reasonOptions = useReasonOptions();

  const motivationsUpdateMutation =
    trpc.projects.profile.motivationsUpdate.useMutation();

  const methods = useForm<
    OnboardingReasonFormValues,
    unknown,
    OnboardingProfileFormTransformedValues
  >({
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
    resolver: zodResolver(onboardingReasonSchema),
  });
  const {
    handleSubmit,
    watch,
    resetField,
    formState: { isSubmitting, errors },
  } = methods;
  const [reasonType, setReasonType] = useState<ReasonType>('primary');
  const primaryType = watch('primary.type');
  const secondaryType = watch('secondary.type');

  useEffect(() => {
    if (primaryType === secondaryType && primaryType !== 'other') {
      resetField('secondary', {
        defaultValue: {
          otherValue: '',
          type: null,
        },
      });
    }
  }, [primaryType, resetField, secondaryType]);

  useEffect(() => {
    if (errors.primary) {
      setReasonType('primary');
    }
  }, [errors.primary]);

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
                defaultMessage="Tell us why you're here so that we can customize your experience"
                description="Subtitle for Projects onboarding page"
                id="xg1qLW"
              />
            </Text>
          </div>
          <Section>
            <form
              className="flex flex-col"
              onSubmit={handleSubmit(
                async ({
                  primary: primaryMotivation,
                  secondary: secondaryMotivation,
                }) => {
                  await motivationsUpdateMutation.mutateAsync({
                    primaryMotivation,
                    secondaryMotivation,
                  });

                  router.push('/projects/onboarding/profile');
                },
              )}>
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
                    className={clsx(
                      reasonType === 'secondary' && '!text-brand',
                    )}
                    isDisabled={primaryType === null}
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
                    type="submit"
                    variant="secondary"
                  />
                )}
              </div>
              <ReasonList
                key={reasonType}
                name={reasonType}
                previousValue={
                  reasonType === 'secondary' ? primaryType : undefined
                }
                reasonOptions={reasonOptions}
                onChange={(value) => {
                  if (reasonType === 'primary' && value !== 'other') {
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
                    isDisabled={secondaryType === null || isSubmitting}
                    isLoading={isSubmitting}
                    label={intl.formatMessage({
                      defaultMessage: 'Next',
                      description:
                        'Label for "Next" button on Sign Up Reason section of Projects onboarding page',
                      id: '6ntGyS',
                    })}
                    size="lg"
                    type="submit"
                    variant="secondary"
                  />
                </div>
              )}
            </form>
          </Section>
        </Container>
      </main>
    </FormProvider>
  );
}
