import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';
import { z } from 'zod';

import { trpc } from '~/hooks/trpc';

import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import Anchor from '~/components/ui/Anchor';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Heading from '~/components/ui/Heading';
import RadioGroup from '~/components/ui/RadioGroup';
import type { RadioGroupItemProps } from '~/components/ui/RadioGroup/RadioGroupItem';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import { zodResolver } from '@hookform/resolvers/zod';

const yoeReplacementSchema = z.enum([
  'bootcamp-grad',
  'bootcamper',
  'career-switcher',
  'fresh-grad',
  'intern',
  'masters-cs',
  'others',
  'self-learning',
  'undergrad-cs',
]);

type YOEReplacement = z.infer<typeof yoeReplacementSchema>;

function useYOEReplacementOptions() {
  const intl = useIntl();

  const yoeReplacementOptions = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Undergrad CS',
        description: 'Label for "Undergrad CS" option in YOE replacement',
        id: 'E5x8uP',
      }),
      value: 'undergrad-cs',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Masters CS',
        description: 'Label for "Masters CS" option in YOE replacement',
        id: 'pkWsMA',
      }),
      value: 'masters-cs',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Intern',
        description: 'Label for "Intern" option in YOE replacement',
        id: 'HdBv6k',
      }),
      value: 'intern',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Fresh Grad',
        description: 'Label for "Fresh Grad" option in YOE replacement',
        id: 'oxD4TD',
      }),
      value: 'fresh-grad',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Career Switcher',
        description: 'Label for "Career Switcher" option in YOE replacement',
        id: 'DjHA82',
      }),
      value: 'career-switcher',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Bootcamp Grad',
        description: 'Label for "Bootcamp Grad" option in YOE replacement',
        id: 'SpM0k8',
      }),
      value: 'bootcamp-grad',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Bootcamper',
        description: 'Label for "Bootcamper" option in YOE replacement',
        id: 'WBESe1',
      }),
      value: 'bootcamper',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Self-Learning',
        description: 'Label for "Self-Learning" option in YOE replacement',
        id: '+ahYqd',
      }),
      value: 'self-learning',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'Others',
        description: 'Label for "Others" option in YOE replacement',
        id: '9nq03w',
      }),
      value: 'others',
    },
  ] as const satisfies ReadonlyArray<RadioGroupItemProps<YOEReplacement>>;

  return yoeReplacementOptions;
}

function useMonthYearExperienceSchema() {
  const intl = useIntl();

  return z
    .string()
    .refine(
      (value) => {
        const [month, year] = value.split('/');

        if (!month || !year) {
          return false;
        }

        const monthInt = parseInt(month, 10);
        const yearInt = parseInt(year, 10);

        return monthInt >= 1 && monthInt <= 12 && yearInt >= 1900;
      },
      {
        message: intl.formatMessage({
          defaultMessage: 'Please enter a valid date',
          description:
            'Error message for invalid "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
          id: '3QQssQ',
        }),
      },
    )
    .transform((value) => {
      const [month, year] = value.split('/');

      return new Date(parseInt(year, 10), parseInt(month, 10) - 1);
    });
}

function useOnboardingProfilePage1Schema() {
  const intl = useIntl();
  const monthYearExperienceSchema = useMonthYearExperienceSchema();

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

type OnboardingProfilePage1Values = {
  hasNotStartedWork: boolean;
  jobTitle: string;
  monthYearExperience: string | undefined;
  name: string;
  techStackProficient: string;
  techStackToImprove: string;
  yoeReplacement: {
    option: string | undefined;
    otherText: string | undefined;
  };
};

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
  const yoeReplacementOptions = useYOEReplacementOptions();
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
        <ProjectsReputationCountIncreaseTag points={100} variant="filled" />
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
          <Controller
            control={control}
            name="techStackProficient"
            render={({ field }) => (
              <TextInput
                description={intl.formatMessage(
                  {
                    defaultMessage:
                      'The skills / tools / frameworks you are already familiar in. Cannot find the tag you need? Email us at {supportEmail}',
                    description:
                      'Description for "Tech stack proficient" input on Projects profile onboarding page',
                    id: 'YiE5Xj',
                  },
                  {
                    supportEmail: (
                      <Anchor href="mailto:support@greatfrontend.com">
                        support@greatfrontend.com
                      </Anchor>
                    ),
                  },
                )}
                descriptionStyle="tooltip"
                errorMessage={errors.techStackProficient?.message}
                label={intl.formatMessage({
                  defaultMessage: 'Tech stack you are proficient in',
                  description:
                    'Label for "Tech stack you are proficient in" input on Projects profile onboarding page',
                  id: 'sjcvmA',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'React, HTML, JS',
                  description:
                    'Placeholder for "Tech stack you are proficient in" input on Projects profile onboarding page',
                  id: 'gm+QgP',
                })}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="techStackToImprove"
            render={({ field }) => (
              <TextInput
                description={intl.formatMessage(
                  {
                    defaultMessage:
                      'The skills / tools / frameworks you are hoping to grow.. Cannot find the tag you need? Email us at {supportEmail}',
                    description:
                      'Description for "Tech stack to improve" input on Projects profile onboarding page',
                    id: 'H+so3d',
                  },
                  {
                    supportEmail: (
                      <Anchor href="mailto:support@greatfrontend.com">
                        support@greatfrontend.com
                      </Anchor>
                    ),
                  },
                )}
                descriptionStyle="tooltip"
                errorMessage={errors.techStackToImprove?.message}
                label={intl.formatMessage({
                  defaultMessage: 'Tech stack you are hoping to grow in',
                  description:
                    'Label for "Tech stack you are hoping to grow in" input on Projects profile onboarding page',
                  id: 'UZDhKH',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'NextJS, Vercel',
                  description:
                    'Placeholder for "Tech stack you are hoping to grow in" input on Projects profile onboarding page',
                  id: 'hnDCXW',
                })}
                {...field}
              />
            )}
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
          <div className="space-y-4">
            <Controller
              control={control}
              disabled={watchHasNotStartedWork}
              name="monthYearExperience"
              render={({ field }) => (
                <TextInput
                  description={intl.formatMessage({
                    defaultMessage:
                      'We use this to calculate your YOE and keep it updated',
                    description:
                      'Description for "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
                    id: 'EjGug0',
                  })}
                  descriptionStyle="tooltip"
                  errorMessage={errors.monthYearExperience?.message}
                  isDisabled={field.disabled}
                  label={intl.formatMessage({
                    defaultMessage:
                      'Month and year you started work as a Front End Engineer',
                    description:
                      'Label for "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
                    id: '1SKRR/',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'MM/YYYY',
                    description:
                      'Placeholder for "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
                    id: '/Xai24',
                  })}
                  {...field}
                />
              )}
            />
            <Controller
              control={control}
              name="hasNotStartedWork"
              render={({ field }) => (
                <CheckboxInput
                  label={intl.formatMessage({
                    defaultMessage: "I haven't started work yet",
                    description:
                      'Label for "I haven\'t started work yet" checkbox on Projects profile onboarding page',
                    id: 'b7z86A',
                  })}
                  {...field}
                />
              )}
            />
          </div>
          {watchHasNotStartedWork && (
            <Text>
              <Controller
                control={control}
                name="yoeReplacement.option"
                render={({ field }) => (
                  <RadioGroup
                    className="grid grid-cols-3 gap-x-12 gap-y-2"
                    errorMessage={errors.yoeReplacement?.option?.message}
                    label={intl.formatMessage({
                      defaultMessage:
                        'Select another status to display in place of your YOE:',
                      description:
                        'Label for "Years of experience replacement status" choices on Projects profile onboarding page',
                      id: '40fcnl',
                    })}
                    {...field}>
                    {yoeReplacementOptions.map((option) => (
                      <RadioGroupItem key={option.value} {...option} />
                    ))}
                  </RadioGroup>
                )}
              />
              {watchYoeReplacementOption === 'others' && (
                <Controller
                  control={control}
                  name="yoeReplacement.otherText"
                  render={({ field }) => (
                    <TextInput
                      className="mt-4"
                      errorMessage={errors.yoeReplacement?.otherText?.message}
                      isLabelHidden={true}
                      label={intl.formatMessage({
                        defaultMessage: 'Other',
                        description:
                          'Label for "Other" input for "Years of experience replacement status" on Projects profile onboarding page',
                        id: 'WWdQAb',
                      })}
                      placeholder={intl.formatMessage({
                        defaultMessage: 'Write here',
                        description:
                          'Placeholder for "Other" input for "Years of experience replacement status" on Projects profile onboarding page',
                        id: 'WH8fwr',
                      })}
                      {...field}
                    />
                  )}
                />
              )}
            </Text>
          )}
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
