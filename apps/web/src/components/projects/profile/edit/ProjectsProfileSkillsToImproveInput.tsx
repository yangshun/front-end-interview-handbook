import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { SCROLL_HASH_PROJECTS_PROFILE } from '~/hooks/useScrollToHash';

import { useIntl } from '~/components/intl';
import ProjectsChallengeReputationBadge from '~/components/projects/challenges/metadata/ProjectsChallengeReputationBadge';
import ProjectsSkillTechStackInput from '~/components/projects/skills/form/ProjectsSkillTechStackInput';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';

import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';

type Values = ProjectsProfileEditFormValues;

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
      render={({ field, formState: { dirtyFields, errors, submitCount } }) => (
        <div
          className="relative flex-1"
          id={SCROLL_HASH_PROJECTS_PROFILE.SKILLS_TOGROW}>
          <span className="end-0 absolute">
            <ProjectsChallengeReputationBadge
              completed={field.value.length > 0}
              points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
            />
          </span>
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
              dirtyFields[name] || submitCount > 0
                ? errors[name]?.message
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
        </div>
      )}
    />
  );
}
