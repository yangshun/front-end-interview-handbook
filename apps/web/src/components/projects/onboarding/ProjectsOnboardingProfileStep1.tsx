import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import useProjectsMonthYearExperienceSchema from '~/components/projects/hooks/useProjectsMonthYearExperienceSchema';
import { yoeReplacementSchema } from '~/components/projects/misc';
import ProjectsProfileYOEInput from '~/components/projects/profile/ProjectsProfileYOEInput';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import TextInput from '~/components/ui/TextInput';

import ProjectsProfileEditAvatar from '../profile/edit/ProjectsProfileEditAvatar';

import { zodResolver } from '@hookform/resolvers/zod';

export type ProjectsProfileOnboardingStep1FormValues = {
  avatarUrl?: string | undefined;
  hasNotStartedWork: boolean;
  jobTitle: string;
  monthYearExperience: string | undefined;
  name: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
};

function useOnboardingProfileStep1Schema() {
  const intl = useIntl();
  const monthYearExperienceSchema = useProjectsMonthYearExperienceSchema();

  const baseSchema = z.object({
    avatarUrl: z.string().optional(),
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

type OnboardingProfileStep1TransformedValues = z.infer<
  ReturnType<typeof useOnboardingProfileStep1Schema>
>;

type Props = Readonly<{
  onFinish: () => void;
}>;

export default function ProjectsOnboardingProfileStep1({ onFinish }: Props) {
  const intl = useIntl();
  const onboardingProfileStep1Schema = useOnboardingProfileStep1Schema();
  const { data: initialValues } =
    trpc.projects.profile.onboardingStep1.useQuery();
  const onboardingStep1UpdateMutation =
    trpc.projects.profile.onboardingStep1Update.useMutation();

  const {
    control,
    watch,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<
    ProjectsProfileOnboardingStep1FormValues,
    unknown,
    OnboardingProfileStep1TransformedValues
  >({
    resolver: zodResolver(onboardingProfileStep1Schema),
    values: {
      avatarUrl: initialValues?.avatarUrl ?? '',
      hasNotStartedWork: initialValues?.currentStatus !== null,
      jobTitle: initialValues?.title ?? '',
      monthYearExperience: initialValues?.startWorkDate
        ? `${
            initialValues.startWorkDate.getMonth() + 1
          }/${initialValues.startWorkDate.getFullYear()}`
        : undefined,
      name: initialValues?.name ?? '',
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
    <form
      className="flex flex-col gap-y-8"
      onSubmit={handleSubmit(
        async (data: OnboardingProfileStep1TransformedValues) => {
          await onboardingStep1UpdateMutation.mutateAsync({
            avatarUrl: data.avatarUrl,
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
      <section className="flex flex-col gap-y-6">
        <div className="flex justify-between gap-2">
          <Heading level="heading6">
            <FormattedMessage
              defaultMessage="Basic details"
              description="Section title for user onboarding form"
              id="nNCpzS"
            />
          </Heading>
          <ProjectsChallengeReputationTag points={100} variant="filled" />
        </div>
        <div className="flex flex-col items-start gap-x-16 gap-y-6 sm:flex-row">
          <Controller
            control={control}
            name="avatarUrl"
            render={({ field }) => (
              <ProjectsProfileEditAvatar
                src={field.value ?? ''}
                onChange={(imageUrl) => {
                  field.onChange(imageUrl);
                }}
              />
            )}
          />
          <div className="flex flex-1 flex-col gap-6 self-stretch sm:self-auto">
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
      </section>
      <section className="flex flex-col gap-y-6">
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Experience"
            description="Section title for user onboarding form"
            id="+c9fjo"
          />
        </Heading>
        <ProjectsProfileYOEInput
          control={control}
          errors={errors}
          watchHasNotStartedWork={watchHasNotStartedWork}
          watchYoeReplacementOption={watchYoeReplacementOption}
        />
      </section>
      <Button
        className="self-end"
        icon={RiArrowRightLine}
        isDisabled={isSubmitting}
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
  );
}
