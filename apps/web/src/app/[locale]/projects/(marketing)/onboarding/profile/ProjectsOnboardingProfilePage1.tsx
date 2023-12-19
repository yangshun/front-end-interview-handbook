import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { RiArrowRightLine } from 'react-icons/ri';
import { FormattedMessage, useIntl } from 'react-intl';

import ProjectsReputationCountIncreaseTag from '~/components/projects/stats/ProjectsReputationCountIncreaseTag';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import CheckboxInput from '~/components/ui/CheckboxInput';
import Heading from '~/components/ui/Heading';
import RadioGroup from '~/components/ui/RadioGroup';
import type { RadioGroupItemProps } from '~/components/ui/RadioGroup/RadioGroupItem';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import type { OnboardingProfileFormValues } from './ProjectsOnboardingProfilePage';

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
  ] as const satisfies ReadonlyArray<RadioGroupItemProps<string>>;

  return yoeReplacementOptions;
}

export type OnboardingProfilePage1FormValues = Readonly<{
  jobTitle: string;
  monthYearExperience: string;
  name: string;
  techStackProficient: string;
  techStackToImprove: string;
  yoeOtherText: string;
  yoeReplacement: string;
}>;

type Props = Readonly<{
  onNextClick: () => void;
  userName: string;
}>;

export default function ProjectsOnboardingProfilePage1({
  userName,
  onNextClick,
}: Props) {
  const intl = useIntl();
  const yoeReplacementOptions = useYOEReplacementOptions();

  const { control, watch } = useFormContext<OnboardingProfileFormValues>();
  const watchYoeReplacement = watch('yoeReplacement');

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
      <div className="mt-6 flex flex-col gap-y-16">
        <div className="flex flex-col items-start gap-x-16 gap-y-6 sm:flex-row sm:items-end">
          <div className="flex flex-col items-center gap-4">
            <Avatar
              className="h-[120px] w-[120px]"
              size="custom"
              src="https://source.unsplash.com/random/128x128"
              userName={userName}
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
                    defaultMessage: 'Job title description',
                    description:
                      'Description for "Job Title" input on Projects profile onboarding page',
                    id: 'UTwUDd',
                  })}
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
                description={intl.formatMessage({
                  defaultMessage: 'Tech stack proficient description',
                  description:
                    'Description for "Tech stack proficient" input on Projects profile onboarding page',
                  id: 'YSJ2ji',
                })}
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
                description={intl.formatMessage({
                  defaultMessage: 'Tech stack to improve description',
                  description:
                    'Description for "Tech stack to improve" input on Projects profile onboarding page',
                  id: '9qM8IM',
                })}
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
              name="monthYearExperience"
              render={({ field }) => (
                <TextInput
                  description={intl.formatMessage({
                    defaultMessage:
                      'Month and year you started work as a Front End Engineer description',
                    description:
                      'Description for "Month and year you started work as a Front End Engineer" input on Projects profile onboarding page',
                    id: '1wTKEc',
                  })}
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
            <CheckboxInput
              label={intl.formatMessage({
                defaultMessage: "I haven't started work yet",
                description:
                  'Label for "I haven\'t started work yet" checkbox on Projects profile onboarding page',
                id: 'b7z86A',
              })}
            />
          </div>
          <Text>
            <Controller
              control={control}
              name="yoeReplacement"
              render={({ field }) => (
                <RadioGroup
                  className="grid grid-cols-3 gap-x-12 gap-y-2"
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
            {watchYoeReplacement === 'others' && (
              <Controller
                control={control}
                name="yoeOtherText"
                render={({ field }) => (
                  <TextInput
                    className="mt-4"
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
        </div>
        <Button
          className="self-end"
          icon={RiArrowRightLine}
          label={intl.formatMessage({
            defaultMessage: 'Next',
            description:
              'Label for Next button on Projects profile onboarding page',
            id: 'ghssuE',
          })}
          size="lg"
          variant="secondary"
          onClick={onNextClick}
        />
      </div>
    </>
  );
}
