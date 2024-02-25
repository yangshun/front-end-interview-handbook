import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ProjectsOnboardingProfileStep2FormValues } from '~/components/projects/onboarding/ProjectsOnboardingProfileStep2';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextArea from '~/components/ui/TextArea';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = {
  control: Control<Values>;
};

export default function ProjectsProfileBioInput({ control }: Props) {
  const intl = useIntl();

  return (
    <Controller
      control={control}
      name="bio"
      render={({ field }) => (
        <TextArea
          description={intl.formatMessage({
            defaultMessage:
              'Tell the community about yourself - your background, skills, aspirations and skills and tools you hope to pick up!',
            description:
              'Description for Biography input on Projects profile onboarding page',
            id: 'I60bQN',
          })}
          descriptionStyle="tooltip"
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
  );
}
