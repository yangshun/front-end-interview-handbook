import type { Control } from 'react-hook-form';
import { Controller, useFormContext } from 'react-hook-form';
import { useIntl } from 'react-intl';

import { getProfileNameAttrs } from '~/components/profile/fields/ProfileNameSchema';
import type { ProjectsOnboardingProfileStep2FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep2';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

import ProjectsProfileBioInput from './ProjectsProfileBioInput';
import ProjectsProfileEditAvatar from './ProjectsProfileEditAvatar';
import ProjectsProfileUsernameInput from './ProjectsProfileUsernameInput';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

export default function ProjectsProfileBasicInfoSection({
  setUsernameExistsError,
}: {
  setUsernameExistsError: (value: boolean) => void;
}) {
  const intl = useIntl();
  const nameAttrs = getProfileNameAttrs(intl);

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
      <div className="flex w-full flex-col gap-6">
        <div className="grid gap-6 md:grid-cols-2">
          <Controller
            control={control}
            name="name"
            render={({ field }) => (
              <TextInput
                errorMessage={errors.name?.message}
                label={nameAttrs.label}
                maxLength={nameAttrs.validation.maxLength}
                placeholder={nameAttrs.placeholder}
                {...field}
              />
            )}
          />
          <Controller
            control={control}
            name="username"
            render={({ field }) => (
              <ProjectsProfileUsernameInput
                error={errors.username?.message}
                field={field}
                setUsernameExistsError={setUsernameExistsError}
              />
            )}
          />
        </div>
        <div className="flex-1">
          <ProjectsProfileBioInput control={control as Control<Values>} />
        </div>
      </div>
    </div>
  );
}
