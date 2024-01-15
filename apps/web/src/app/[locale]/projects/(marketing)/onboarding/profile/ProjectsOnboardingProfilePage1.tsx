import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import useProjectsMonthYearExperienceSchema from '~/components/projects/hooks/useProjectsMonthYearExperienceSchema';
import { yoeReplacementSchema } from '~/components/projects/misc';
import ProjectsProfileTechStackProficientInput from '~/components/projects/profile/ProjectsProfileTechStackProficientInput';
import ProjectsProfileTechStackToImproveInput from '~/components/projects/profile/ProjectsProfileTechStackToImproveInput';
import ProjectsProfileYOEInput from '~/components/projects/profile/ProjectsProfileYOEInput';
import type { OnboardingProfilePage1Values } from '~/components/projects/types';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { zodResolver } from '@hookform/resolvers/zod';

function useOnboardingProfilePage1Schema() {
  const intl = useIntl();
  const monthYearExperienceSchema = useProjectsMonthYearExperienceSchema();

  const baseSchema = z.object({
    jobTitle: z.string().min(1, {
      message: intl.formatMessage({
        defaultMessage: 'Please enter your job title',
        description:
          'Error message for empty "Job title" input on Projects profile onboarding page',
        id: 'VGOH7F',
      }),
    }),
    name: z.string().min(1, {
      message: intl.formatMessage({
        defaultMessage: 'Please enter your name',
        description:
          'Error message for empty "Name" input on Projects profile onboarding page',
        id: 'yqjkfw',
      }),
    }),
    // TODO (projects): add error message for empty input
    techStackProficient: z.string(),
    // TODO (projects): add error message for empty input
    techStackToImprove: z.string(),
  });

  return z.discriminatedUnion('hasNotStartedWork', [
    baseSchema.extend({
      hasNotStartedWork: z.literal(false),
      monthYearExperience: monthYearExperienceSchema,
    }),
    baseSchema.extend({
      hasNotStartedWork: z.literal(true),
      monthYearExperience: monthYearExperienceSchema
        .optional()
        .transform(() => undefined),
      yoeReplacement: z
        .discriminatedUnion('option', [
          z.object({
            option: yoeReplacementSchema.extract(['others']),
            otherText: z.string().min(1, {
              message: intl.formatMessage({
                defaultMessage: 'Please enter your status',
                description:
                  'Error message for empty "Other" input for "Years of experience replacement status" on Projects profile onboarding page',
                id: 'KQXNDC',
              }),
            }),
          }),
          z.object({
            option: yoeReplacementSchema.exclude(['others']),
          }),
        ])
        .transform((value) => {
          if (value.option === 'others') {
            return value.otherText;
          }

          return value.option;
        }),
    }),
  ]);
}

type OnboardingProfilePage1TransformedValues = z.infer<
  ReturnType<typeof useOnboardingProfilePage1Schema>
>;

type Props = Readonly<{
  onFinish: () => void;
  userName: string;
}>;

export default function ProjectsOnboardingProfilePage1({
  userName,
  onFinish,
}: Props) {
  const intl = useIntl();
  const onboardingProfilePage1Schema = useOnboardingProfilePage1Schema();
  const { data: initialValues } =
    trpc.projects.profile.onboardingStep1Get.useQuery();
  const onboardingStep1UpdateMutation =
    trpc.projects.profile.onboardingStep1Update.useMutation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm<
    OnboardingProfilePage1Values,
    unknown,
    OnboardingProfilePage1TransformedValues
  >({
    resolver: zodResolver(onboardingProfilePage1Schema),
    values: {
      hasNotStartedWork: initialValues?.currentStatus !== null,
      jobTitle: initialValues?.title ?? '',
      monthYearExperience: initialValues?.startWorkDate
        ? `${
            initialValues.startWorkDate.getMonth() + 1
          }/${initialValues.startWorkDate.getFullYear()}`
        : undefined,
      name: initialValues?.name ?? '',
      techStackProficient: '',
      techStackToImprove: '',
      yoeReplacement: {
        option: yoeReplacementSchema
          .catch(() => 'others' as const)
          .parse(initialValues?.currentStatus),
        otherText: !yoeReplacementSchema.safeParse(initialValues?.currentStatus)
          .success
          ? initialValues?.currentStatus ?? undefined
          : undefined,
      },
    },
  });
  const watchYoeReplacementOption = watch('yoeReplacement.option');
  const watchHasNotStartedWork = watch('hasNotStartedWork');

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
        <ProjectsChallengeReputationTag points={100} variant="filled" />
      </div>
      <form
        className="mt-6 flex flex-col gap-y-16"
        onSubmit={handleSubmit(
          async (data: OnboardingProfilePage1TransformedValues) => {
            await onboardingStep1UpdateMutation.mutateAsync({
              currentStatus: data.hasNotStartedWork
                ? data.yoeReplacement
                : undefined,
              name: data.name,
              startWorkDate: data.monthYearExperience,
              title: data.jobTitle,
            });
            onFinish();
          },
        )}>
        <div className="flex flex-col items-start gap-x-16 gap-y-6 sm:flex-row sm:items-end">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              alt={userName}
              className="h-[120px] w-[120px]"
              size="custom"
              src="https://source.unsplash.com/random/128x128"
            />
            <Button
              label={intl.formatMessage({
                defaultMessage: 'Edit profile photo',
                description:
                  'Label for "Edit profile photo" button on Projects profile onboarding page',
                id: 'rax4QM',
              })}
              size="sm"
              variant="secondary"
            />
          </div>
          <div className="flex flex-1 flex-col gap-4 self-stretch sm:self-auto">
            <Controller
              control={control}
              name="name"
              render={({ field }) => (
                <TextInput
                  errorMessage={errors.name?.message}
                  label={intl.formatMessage({
                    defaultMessage: 'Name',
                    description:
                      'Label for "Name" input on Projects profile onboarding page',
                    id: 'AVk8pE',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Jane Smith',
                    description:
                      'Placeholder for "Name" input on Projects profile onboarding page',
                    id: 'Ihutcw',
                  })}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <TextInput
                  description={intl.formatMessage({
                    defaultMessage:
                      'Similar to your LinkedIn title. Include your role and company, or your interests.',
                    description:
                      'Description for "Job Title" input on Projects profile onboarding page',
                    id: '7uiIH5',
                  })}
                  descriptionStyle="tooltip"
                  errorMessage={errors.jobTitle?.message}
                  label={intl.formatMessage({
                    defaultMessage: 'Job Title',
                    description:
                      'Label for "Job Title" input on Projects profile onboarding page',
                    id: 'UIOmIs',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'Software Engineer at Stripe | Ex-Google',
                    description:
                      'Placeholder for "Job Title" input on Projects profile onboarding page',
                    id: 'Zk7X6D',
                  })}
                  {...field}
                />
              )}
            />
          </div>
        </div>
        <div className="space-y-6">
          <Text weight="bold">
            <FormattedMessage
              defaultMessage="Skills"
              description="Label for Skills section of Projects profile onboarding page"
              id="DdbtcA"
            />
          </Text>
          <ProjectsProfileTechStackProficientInput
            control={control}
            errors={errors}
          />
          <ProjectsProfileTechStackToImproveInput
            control={control}
            errors={errors}
          />
        </div>
        <div className="flex flex-col gap-y-6">
          <Text weight="bold">
            <FormattedMessage
              defaultMessage="Years of Experience"
              description="Label for Years of Experience section of Projects profile onboarding page"
              id="grrYsM"
            />
          </Text>
          <ProjectsProfileYOEInput
            control={control}
            errors={errors}
            watchHasNotStartedWork={watchHasNotStartedWork}
            watchYoeReplacementOption={watchYoeReplacementOption}
          />
        </div>
        <Button
          className="self-end"
          icon={RiArrowRightLine}
          isDisabled={!isDirty || isSubmitting}
          isLoading={isSubmitting}
          label={intl.formatMessage({
            defaultMessage: 'Next',
            description:
              'Label for Next button on Projects profile onboarding page',
            id: 'ghssuE',
          })}
          size="lg"
          type="submit"
          variant="secondary"
        />
      </form>
    </>
  );
}
