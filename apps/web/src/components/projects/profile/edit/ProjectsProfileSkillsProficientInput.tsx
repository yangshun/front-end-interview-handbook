import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Anchor from '~/components/ui/Anchor';

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
      )}
    />
  );
}
