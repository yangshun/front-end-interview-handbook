import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ProjectsEditProfileValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';

import type { ProjectsOnboardingProfileStep2FormValues } from '../onboarding/ProjectsOnboardingProfileStep2';
import ProjectsSkillTechStackInput from '../skills/form/ProjectsSkillTechStackInput';

type Values =
  | ProjectsEditProfileValues
  | ProjectsOnboardingProfileStep2FormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

const name = 'skillsProficient';

export default function ProjectsProfileTechStackProficientInput({
  control,
}: Props) {
  const intl = useIntl();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => (
        <ProjectsSkillTechStackInput
          description={intl.formatMessage(
            {
              defaultMessage:
                'The skills / tools / frameworks you are already familiar in. Cannot find the tag you need? Email us at {supportEmail}',
              description: 'Description for tech stack field',
              id: 'D1kkKk',
            },
            {
              supportEmail: (
                <Anchor href="mailto:support@greatfrontend.com">
                  support@greatfrontend.com
                </Anchor>
              ),
            },
          )}
          errorMessage={formState.errors?.[name]?.message}
          label={intl.formatMessage({
            defaultMessage: 'Tech stack you are proficient in',
            description: 'Label for tech stack field',
            id: 'GV0CBc',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'React, HTML, JavaScript',
            description: 'Placeholder for tech stack field',
            id: 'Lv6+nn',
          })}
          {...field}
        />
      )}
    />
  );
}
