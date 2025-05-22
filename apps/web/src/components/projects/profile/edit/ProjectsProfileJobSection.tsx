import { Controller, useFormContext } from 'react-hook-form';

import { FormattedMessage, useIntl } from '~/components/intl';
import ProjectsChallengeReputationBadge from '~/components/projects/challenges/metadata/ProjectsChallengeReputationBadge';
import type { ProjectsProfileOnboardingStepFormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileForm';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';
import RadioGroup from '~/components/ui/RadioGroup';
import RadioGroupItem from '~/components/ui/RadioGroup/RadioGroupItem';
import Text from '~/components/ui/Text';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import useProjectsYOEReplacementOptions from '../../hooks/useProjectsYOEReplacementOptions';
import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';
import { getProjectsProfileJobStatusOthersFieldAttributes } from '../fields/ProjectsProfileJobSchema';

type Values =
  | ProjectsProfileEditFormValues
  | ProjectsProfileOnboardingStepFormValues;

export default function ProjectsProfileJobSection() {
  const intl = useIntl();
  const {
    control,
    formState: { dirtyFields, errors, submitCount },
    setValue,
    watch,
  } = useFormContext<Values>();
  const statusAttrs = getProjectsProfileJobStatusOthersFieldAttributes(intl);

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
            onChange={(value) => {
              field.onChange(value === 'yes' ? true : false);
              if (value === 'no' && !yoeReplacementOption) {
                setValue('yoeReplacement.option', 'others');
              }
            }}>
            {jobStatusOptions.map((option) => (
              <RadioGroupItem key={option.value} {...option} />
            ))}
          </RadioGroup>
        )}
      />
      {hasStartedWork && (
        <div className="flex flex-col space-y-6">
          <div className="flex w-full flex-col gap-x-4 gap-y-6 md:flex-row md:gap-y-2">
            <Controller
              control={control}
              name="jobTitle"
              render={({ field }) => (
                <div className="flex-1">
                  <TextInput
                    errorMessage={
                      dirtyFields.jobTitle || submitCount > 0
                        ? errors.jobTitle?.message
                        : undefined
                    }
                    label={intl.formatMessage({
                      defaultMessage: 'Job title',
                      description:
                        'Label for "Job Title" input on Projects profile onboarding page',
                      id: 'xiEHQ1',
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
            <Text
              className="hidden md:mt-9 md:block"
              size="body2"
              weight="medium">
              {intl.formatMessage({
                defaultMessage: 'at',
                description: 'Where the user is working at',
                id: 'qBD+e/',
              })}
            </Text>
            <Controller
              control={control}
              name="company"
              render={({ field }) => (
                <div className="relative flex-1">
                  <span className="end-0 absolute">
                    <ProjectsChallengeReputationBadge
                      completed={!!field.value}
                      points={
                        ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL
                      }
                    />
                  </span>
                  <TextInput
                    description={intl.formatMessage({
                      defaultMessage:
                        'The company you currently work at. This information can be made private on more sensitive products like interviews.',
                      description:
                        'Description for "Company" input on Projects profile onboarding page',
                      id: 'AEDpDO',
                    })}
                    descriptionStyle="tooltip"
                    errorMessage={
                      dirtyFields.company || submitCount > 0
                        ? errors.company?.message
                        : undefined
                    }
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
                errorMessage={
                  dirtyFields.monthYearExperience || submitCount > 0
                    ? errors.monthYearExperience?.message
                    : undefined
                }
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
                onChange={(value) => {
                  // Regex to check for MM/YYYY format
                  const isValidFormat =
                    /^(0[1-9]$|1[0-2]$|[0-1]$)|((0[1-9]|1[0-2])\/$)|(0[1-9]|1[0-2])\/\d{0,4}$/.test(
                      value,
                    );

                  // Update the state only if the input is valid or empty
                  if (isValidFormat || value === '') {
                    field.onChange(value);
                  }
                }}
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
                  errorMessage={
                    dirtyFields.title || submitCount > 0
                      ? errors.title?.message
                      : undefined
                  }
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
                description={intl.formatMessage({
                  defaultMessage:
                    'If you haven’t started a job in SWE or front end yet, select another status to display in place of your YOE',
                  description:
                    'Label for "Status" choices on Projects profile page',
                  id: 'PbcB1O',
                })}
                descriptionStyle="tooltip"
                errorMessage={
                  dirtyFields.yoeReplacement?.option || submitCount > 0
                    ? errors.yoeReplacement?.option?.message
                    : undefined
                }
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
                <TextArea
                  errorMessage={
                    dirtyFields.yoeReplacement?.otherText || submitCount > 0
                      ? errors.yoeReplacement?.otherText?.message
                      : undefined
                  }
                  isLabelHidden={true}
                  label={statusAttrs.label}
                  maxLength={statusAttrs.validation.maxLength}
                  placeholder={statusAttrs.placeholder}
                  rows={1}
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
