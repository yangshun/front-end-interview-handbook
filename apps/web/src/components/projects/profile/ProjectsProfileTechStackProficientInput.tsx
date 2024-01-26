import type { Control, FieldErrors } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type {
  ProjectsEditProfileValues,
  ProjectsOnboardingProfileStep1Values,
} from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';
import TextInput from '~/components/ui/TextInput';

type Values = ProjectsEditProfileValues | ProjectsOnboardingProfileStep1Values;

type Props = Readonly<{
  control: Control<Values>;
  errors: FieldErrors<Values>;
}>;

export default function ProjectsProfileTechStackProficientInput({
  control,
  errors,
}: Props) {
  const intl = useIntl();

  return (
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
  );
}
