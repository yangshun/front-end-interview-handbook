import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { SCROLL_HASH_PROJECTS_PROFILE } from '~/hooks/useScrollToHash';

import { useIntl } from '~/components/intl';
import ProjectsChallengeReputationBadge from '~/components/projects/challenges/metadata/ProjectsChallengeReputationBadge';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';

import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';
import ProjectsSkillTechStackInput from '../../skills/form/ProjectsSkillTechStackInput';

type Values = ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

const name = 'skillsProficient';

export default function ProjectsProfileSkillsProficientInput({
  control,
}: Props) {
  const intl = useIntl();

  return (
    <Controller
      control={control}
      name={name}
      render={({ field, formState }) => (
        <div
          className="relative flex-1"
          id={SCROLL_HASH_PROJECTS_PROFILE.SKILLS_PROFICIENT}>
          <span className="absolute end-0">
            <ProjectsChallengeReputationBadge
              completed={field.value.length > 0}
              points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
            />
          </span>
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
            errorMessage={
              formState.dirtyFields?.[name] || formState.submitCount > 0
                ? formState.errors?.[name]?.message
                : undefined
            }
            label={intl.formatMessage({
              defaultMessage: 'Skills you are proficient in',
              description: 'Label for tech stack field',
              id: 'GohLa0',
            })}
            placeholder={intl.formatMessage({
              defaultMessage: 'React, HTML, JavaScript',
              description: 'Placeholder for tech stack field',
              id: 'Lv6+nn',
            })}
            {...field}
          />
        </div>
      )}
    />
  );
}
