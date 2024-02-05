import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';
import type { ProjectsEditProfileValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';

import type { ProjectsOnboardingProfileStep2FormValues } from '../onboarding/ProjectsOnboardingProfileStep2';

type Values =
  | ProjectsEditProfileValues
  | ProjectsOnboardingProfileStep2FormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

const name = 'skillsToGrow';

export default function ProjectsProfileTechStackToImproveInput({
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
                'The skills / tools / frameworks you are hoping to grow in. Cannot find the tag you need? Email us at {supportEmail}',
              description: 'Description for tech stack field',
              id: 'W1Vfmc',
            },
            {
              supportEmail: (
                <Anchor href="mailto:support@greatfrontend.com">
                  support@greatfrontend.com
                </Anchor>
              ),
            },
          )}
          errorMessage={formState.errors[name]?.message}
          label={intl.formatMessage({
            defaultMessage: 'Tech stack you are hoping to grow in',
            description: 'Label for tech stack field',
            id: 'tUh3US',
          })}
          placeholder={intl.formatMessage({
            defaultMessage: 'Next.js, Nuxt, SvelteKit',
            description: 'Placeholder for tech stack field',
            id: 'MA/YA9',
          })}
          {...field}
        />
      )}
    />
  );
}
