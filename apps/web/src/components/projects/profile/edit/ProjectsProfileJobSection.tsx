import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import type { ProjectsProfileOnboardingStep1FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep1';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';
import RadioGroup from '~/components/ui/RadioGroup';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

import useProjectsYOEReplacementOptions from '../../hooks/useProjectsYOEReplacementOptions';

type Values =
  | ProjectsProfileEditFormValues
  | ProjectsProfileOnboardingStep1FormValues;

export default function ProjectsProfileJobSection() {
  const intl = useIntl();
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<Values>();

  const jobStatusOptions = [
    {
      label: intl.formatMessage({
        defaultMessage: 'Yes',
        description: 'Yes option label',
        id: 'IesD4T',
      }),
      value: 'yes',
    },
    {
      label: intl.formatMessage({
        defaultMessage: 'No',
        description: 'No option label',
        id: 'PoILgY',
      }),
      value: 'no',
    },
  ];
  const { yoeReplacementOptions } = useProjectsYOEReplacementOptions();

  const hasStartedWork = watch('hasStartedWork');
  const yoeReplacementOption = watch('yoeReplacement.option');

  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Job Status"
          description="Title of job status section of projects profile edit page"
          id="BJEmxH"
        />
      </Heading>
      <Controller
        control={control}
        name="hasStartedWork"
        render={({ field }) => (
          <RadioGroup
            label={intl.formatMessage({
              defaultMessage:
                'Are you currently working as a Software Engineer?',
              description:
                'Label for "has work started" in projects profile page',
              id: 'SKfw++',
            })}
            {...field}
            value={field.value ? 'yes' : 'no'}
            onChange={(value) =>
              field.onChange(value === 'yes' ? true : false)
            }>
            {jobStatusOptions.map((option) => (
              <RadioGroupItem key={option.value} {...option} />
            ))}
          </RadioGroup>
        )}
      />
      {hasStartedWork && (
        <div className="flex flex-col space-y-6">
          <div className="flex w-full flex-col gap-x-6 gap-y-2 md:flex-row">
            <Controller
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <div className="flex-1">
                  <TextInput
                    // TODO(projects): Recheck with the description for Job Title
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
                      defaultMessage: 'Software Engineer',
                      description:
                        'Placeholder for "Job Title" input on Projects profile onboarding page',
                      id: 'KXNpDt',
                    })}
                    {...field}
                  />
                </div>
              )}
            />
            <Text className="md:mt-8" size="body2" weight="medium">
              {intl.formatMessage({
                defaultMessage: 'at',
                description: 'At',
                id: '+NBACf',
              })}
            </Text>
            <Controller
              control={control}
              name="company"
              render={({ field }) => (
                <div className="flex-1">
                  <TextInput
                    // TODO(projects): Replace with correct description for company
                    description={intl.formatMessage({
                      defaultMessage:
                        'Similar to your LinkedIn title. Include your role and company, or your interests.',
                      description:
                        'Description for "Company" input on Projects profile onboarding page',
                      id: 'u4C2En',
                    })}
                    descriptionStyle="tooltip"
                    errorMessage={errors.company?.message}
                    label={intl.formatMessage({
                      defaultMessage: 'Company (optional)',
                      description:
                        'Label for "Company" input on Projects profile onboarding page',
                      id: 'Oxj7x1',
                    })}
                    placeholder={intl.formatMessage({
                      defaultMessage: 'Stripe',
                      description:
                        'Placeholder for "Company" input on Projects profile onboarding page',
                      id: 'b7eX+v',
                    })}
                    {...field}
                  />
                </div>
              )}
            />
          </div>
          <Controller
            control={control}
            disabled={!hasStartedWork}
            name="monthYearExperience"
            render={({ field }) => (
              <TextInput
                description={intl.formatMessage({
                  defaultMessage:
                    'We use this to calculate your YOE and keep it updated',
                  description:
                    'Description for "When did you start work" input on Projects profile onboarding page',
                  id: '/c/hHN',
                })}
                descriptionStyle="tooltip"
                errorMessage={errors.monthYearExperience?.message}
                isDisabled={field.disabled}
                label={intl.formatMessage({
                  defaultMessage: 'When did you start work?',
                  description:
                    'Label for "When did you start work" input on Projects profile onboarding page',
                  id: 'DBkNOt',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage: 'MM/YYYY',
                  description:
                    'Placeholder for "When did you start work" input on Projects profile onboarding page',
                  id: 'szsYwJ',
                })}
                {...field}
              />
            )}
          />
        </div>
      )}
      {!hasStartedWork && (
        <div className="flex flex-col gap-y-6">
          <Controller
            control={control}
            name="title"
            render={({ field }) => (
              <div className="flex-1">
                <TextInput
                  descriptionStyle="tooltip"
                  errorMessage={errors.title?.message}
                  label={intl.formatMessage({
                    defaultMessage: 'Title',
                    description:
                      'Label for "Job Title" input on Projects profile onboarding page',
                    id: '2CZvP8',
                  })}
                  placeholder={intl.formatMessage({
                    defaultMessage: 'CS student at MIT',
                    description:
                      'Placeholder for "Title" input on Projects profile onboarding page',
                    id: '6WpcdM',
                  })}
                  {...field}
                />
              </div>
            )}
          />
          <Controller
            control={control}
            name="yoeReplacement.option"
            render={({ field }) => (
              <RadioGroup
                className="grid grid-cols-2 gap-x-12 gap-y-2 md:grid-cols-3"
                errorMessage={errors.yoeReplacement?.option?.message}
                label={intl.formatMessage({
                  defaultMessage: 'Status',
                  description:
                    'Label for "Years of experience replacement status" choices on Projects profile onboarding page',
                  id: 'chadI5',
                })}
                {...field}>
                {yoeReplacementOptions.map((option) => (
                  <RadioGroupItem key={option.value} {...option} />
                ))}
              </RadioGroup>
            )}
          />
          {yoeReplacementOption === 'others' && (
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
        </div>
      )}
    </div>
  );
}
