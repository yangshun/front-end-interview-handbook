import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';

import { SCROLL_HASH_PROJECTS_PROFILE } from '~/hooks/useScrollToHash';

import { useIntl } from '~/components/intl';
import ProjectsChallengeReputationBadge from '~/components/projects/challenges/metadata/ProjectsChallengeReputationBadge';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextArea from '~/components/ui/TextArea';

import { getProjectsProfileBioAttrs } from '../fields/ProjectsProfileBioSchema';
import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';

type Values = ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

export default function ProjectsProfileBioInput({ control }: Props) {
  const intl = useIntl();

  const attrs = getProjectsProfileBioAttrs(intl);

  return (
    <Controller
      control={control}
      name="bio"
      render={({ field, formState }) => (
        <div className="relative flex-1" id={SCROLL_HASH_PROJECTS_PROFILE.BIO}>
          <span className="absolute end-0">
            <ProjectsChallengeReputationBadge
              completed={!!field.value}
              points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
            />
          </span>
          <TextArea
            description={attrs.description}
            descriptionStyle="tooltip"
            errorMessage={
              formState.dirtyFields.bio || formState.submitCount > 0
                ? formState.errors.bio?.message
                : undefined
            }
            label={attrs.label}
            maxLength={attrs.validation.maxLength}
            placeholder={attrs.placeholder}
            rows={3}
            {...field}
          />
        </div>
      )}
    />
  );
}
