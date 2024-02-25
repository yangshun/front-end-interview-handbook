import { Controller, useFormContext } from 'react-hook-form';
import { FormattedMessage, useIntl } from 'react-intl';

import type { ProjectsProfileOnboardingStep1FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep1';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';
import TextInput from '~/components/ui/TextInput';

type Props = {
  view: 'onboarding' | 'profile';
};

type Values =
  | ProjectsProfileEditFormValues
  | ProjectsProfileOnboardingStep1FormValues;

export default function ProjectsProfileJobSection({ view }: Props) {
  const intl = useIntl();
  const {
    control,
    formState: { errors },
  } = useFormContext<Values>();

  return (
    <div className="flex flex-col gap-6">
      {view === 'profile' && (
        <Heading level="heading6">
          <FormattedMessage
            defaultMessage="Job"
            description="Title of job section of projects profile edit page"
            id="jeUKH/"
          />
        </Heading>
      )}
      <div className="flex w-full flex-col gap-x-6 gap-y-2 md:flex-row md:items-end">
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
                label={
                  view === 'profile'
                    ? intl.formatMessage({
                        defaultMessage: 'Title',
                        description:
                          'Label for "Job Title" input on Projects profile page',
                        id: 'llpanB',
                      })
                    : intl.formatMessage({
                        defaultMessage: 'Job Title',
                        description:
                          'Label for "Job Title" input on Projects profile onboarding page',
                        id: 'UIOmIs',
                      })
                }
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
        <Text className="md:mb-2" size="body2" weight="medium">
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
    </div>
  );
}
