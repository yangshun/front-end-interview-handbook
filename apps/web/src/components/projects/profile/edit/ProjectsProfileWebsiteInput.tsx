import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiGlobalLine } from 'react-icons/ri';

import { SCROLL_HASH_PROJECTS_PROFILE } from '~/hooks/useScrollToHash';

import { useIntl } from '~/components/intl';
import ProjectsChallengeReputationBadge from '~/components/projects/challenges/metadata/ProjectsChallengeReputationBadge';
import { getProjectsProfileWebsiteAttributes } from '~/components/projects/profile/fields/ProjectsProfileWebsiteSchema';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';

type Values = ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
  showReputationCountIncreaseTag?: boolean;
}>;

export default function ProjectsProfileWebsiteInput({ control }: Props) {
  const intl = useIntl();
  const attrs = getProjectsProfileWebsiteAttributes(intl);

  return (
    <Controller
      control={control}
      name="website"
      render={({ field, formState: { dirtyFields, errors, submitCount } }) => (
        <div
          className="relative flex-1"
          id={SCROLL_HASH_PROJECTS_PROFILE.WEBSITE}>
          <span className="end-0 absolute">
            <ProjectsChallengeReputationBadge
              completed={field.value.length > 0}
              points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
            />
          </span>
          <TextInput
            errorMessage={
              dirtyFields.website || submitCount > 0
                ? errors.website?.message
                : undefined
            }
            label={attrs.label}
            placeholder={attrs.placeholder}
            startIcon={RiGlobalLine}
            {...field}
          />
        </div>
      )}
    />
  );
}
