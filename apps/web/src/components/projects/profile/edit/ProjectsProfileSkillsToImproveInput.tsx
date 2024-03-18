import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';

import type { ProjectsOnboardingProfileStep2FormValues } from '../../onboarding/ProjectsOnboardingProfileStep2';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

const name = 'skillsToGrow';

export default function ProjectsProfileSkillsToImproveInput({
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
          errorMessage={
            formState.dirtyFields[name] || formState.submitCount > 0
              ? formState.errors[name]?.message
              : undefined
          }
          label={intl.formatMessage({
            defaultMessage: 'Skills you are hoping to grow in',
            description: 'Label for tech stack field',
            id: 'cJWhQr',
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
