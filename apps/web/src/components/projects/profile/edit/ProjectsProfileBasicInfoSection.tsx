import { Controller, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

import ProjectsProfileEditAvatar from './ProjectsProfileEditAvatar';

export default function ProjectsProfileBasicInfoSection() {
  const intl = useIntl();

  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectsProfileEditFormValues>();

  return (
    <div className="flex flex-wrap gap-6 md:flex-nowrap md:gap-16">
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
      <div className="flex w-full flex-col gap-6 md:mt-8 md:flex-row">
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
        <div className="flex-1">
          <Controller
            control={control}
            name="bio"
            render={({ field }) => (
              <TextArea
                errorMessage={errors.bio?.message}
                label={intl.formatMessage({
                  defaultMessage: 'Bio',
                  description:
                    'Label for Biography input on Projects profile onboarding page',
                  id: 'ZNPYCk',
                })}
                placeholder={intl.formatMessage({
                  defaultMessage:
                    'Tell us anything - about your journey as a front end developer, your goals and next steps, or how you want to connect with others',
                  description:
                    'Placeholder for Biography input on Projects profile onboarding page',
                  id: 'jeX0Hi',
                })}
                rows={5}
                {...field}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
}
