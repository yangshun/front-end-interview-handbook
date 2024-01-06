import { Controller, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ProjectsEditProfileValues } from '~/components/projects/types';
import Avatar from '~/components/ui/Avatar';
import Button from '~/components/ui/Button';
import TextArea from '~/components/ui/TextArea';
import TextInput from '~/components/ui/TextInput';

export default function ProjectsProfileBasicInfoSection() {
  const intl = useIntl();

  const {
    control,
    formState: { errors },
  } = useFormContext<ProjectsEditProfileValues>();

  return (
    <div className="flex md:gap-16 gap-6 md:flex-nowrap flex-wrap">
      <div className="flex flex-col items-center gap-6">
        <Avatar
          alt="avatar"
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
      <div className="w-full flex gap-6 md:mt-8 md:flex-row flex-col">
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
