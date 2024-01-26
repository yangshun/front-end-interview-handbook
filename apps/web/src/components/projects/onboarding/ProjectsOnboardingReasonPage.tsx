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
} from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import type { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import useProjectsMotivationReasonOptions from '~/components/projects/hooks/useProjectsMotivationReasonOptions';
import useProjectsMotivationReasonSchema from '~/components/projects/hooks/useProjectsMotivationReasonSchema';
import type {
  ProjectsMotivationReasonFormValues,
  ProjectsMotivationReasonOption,
  ProjectsMotivationReasonType,
} from '~/components/projects/types';
import { type ProjectsMotivationReasonValue } from '~/components/projects/types';
import Button from '~/components/ui/Button';
import Container from '~/components/ui/Container';
import Heading from '~/components/ui/Heading';
import Section from '~/components/ui/Heading/HeadingContext';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import {
  themeBackgroundCardColor,
  themeBackgroundLayerEmphasized,
  themeBorderElementColor,
  themeTextBrandColor,
  themeTextDisabledColor,
  themeTextSecondaryColor,
} from '~/components/ui/theme';

import { useI18nRouter } from '~/next-i18nostic/src';

import { zodResolver } from '@hookform/resolvers/zod';

function ReasonList({
  name,
  reasonOptions,
  previousValue,
  onChange,
}: {
  name: ProjectsMotivationReasonType;
  onChange: (value: ProjectsMotivationReasonValue | null) => void;
  previousValue?: ProjectsMotivationReasonValue | null;
  reasonOptions: Array<ProjectsMotivationReasonOption>;
}) {
  const {
    control,
    watch,
    setValue,
    formState: { errors },
  } = useFormContext<ProjectsMotivationReasonFormValues>();
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
              themeBackgroundCardColor,
              selected
                ? 'border-brand'
                : ['glassbox hover:border-brand/50 border-transparent'],
              'focus:outline-brand outline-offset-8',
              disabled && themeBorderElementColor,
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

type OnboardingProfileFormTransformedValues = z.infer<
  ReturnType<typeof useProjectsMotivationReasonSchema>
>;

export default function ProjectsOnboardingReasonPage() {
  const router = useI18nRouter();
  const intl = useIntl();
  const onboardingReasonSchema = useProjectsMotivationReasonSchema();
  const { reasonOptions } = useProjectsMotivationReasonOptions((chunks) => (
    <Text display="inline" weight="bold">
      {chunks}
    </Text>
  ));

  const motivationsUpdateMutation =
    trpc.projects.profile.motivationsUpdate.useMutation();

  const methods = useForm<
    ProjectsMotivationReasonFormValues,
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
  const [reasonType, setReasonType] =
    useState<ProjectsMotivationReasonType>('primary');
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
          className="pt-8 flex flex-col items-center pb-24 gap-12"
          variant="2xl">
          <div className="flex flex-col items-center gap-4">
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
              <div className="-ms-4 mb-4 flex justify-between self-stretch items-center">
                <div className="flex">
                  <Button
                    className={clsx(reasonType === 'primary' && '!text-brand')}
                    label={intl.formatMessage({
                      defaultMessage: 'Primary reason',
                      description:
                        'Label for "Primary reason" button on Sign Up Reason section of Projects onboarding page',
                      id: 'LxlUHa',
                    })}
                    size="md"
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
                    size="md"
                    variant="tertiary"
                    onClick={() => {
                      setReasonType('secondary');
                    }}
                  />
                </div>
                {reasonType === 'secondary' && (
                  <Button
                    href="/projects/challenges"
                    icon={RiArrowRightLine}
                    label={intl.formatMessage({
                      defaultMessage: 'Skip for now',
                      description:
                        'Label for "Skip" button on Sign Up Reason section of Projects onboarding page',
                      id: '8mCs6b',
                    })}
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
