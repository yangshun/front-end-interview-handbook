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

export default function ProjectsProfileTechStackToImproveInput({
  control,
  errors,
}: Props) {
  const intl = useIntl();

  return (
    <Controller
      control={control}
      name="techStackToImprove"
      render={({ field }) => (
        <TextInput
          description={intl.formatMessage(
            {
              defaultMessage:
                'The skills / tools / frameworks you are hoping to grow. Cannot find the tag you need? Email us at {supportEmail}',
              description:
                'Description for "Tech stack to improve" input on Projects profile onboarding page',
              id: 'C34IkO',
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
  );
}
