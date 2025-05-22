import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiGithubFill } from 'react-icons/ri';

import { SCROLL_HASH_PROJECTS_PROFILE } from '~/hooks/useScrollToHash';

import { useIntl } from '~/components/intl';
import ProjectsChallengeReputationBadge from '~/components/projects/challenges/metadata/ProjectsChallengeReputationBadge';
import { getProjectsProfileGitHubAttrs } from '~/components/projects/profile/fields/ProjectsProfileGithubSchema';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import TextInput from '~/components/ui/TextInput';

import { ProjectsReputationPointsConfig } from '../../reputation/ProjectsReputationPointsConfig';

type Values = ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
}>;

export default function ProjectsProfileGithubInput({ control }: Props) {
  const intl = useIntl();

  const attrs = getProjectsProfileGitHubAttrs(intl);

  return (
    <Controller
      control={control}
      name="githubUsername"
      render={({ field, formState: { dirtyFields, errors, submitCount } }) => (
        <div
          className="relative flex-1"
          id={SCROLL_HASH_PROJECTS_PROFILE.GITHUB}>
          <span className="end-0 absolute">
            <ProjectsChallengeReputationBadge
              completed={field.value.length > 0}
              points={ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL}
            />
          </span>
          <TextInput
            errorMessage={
              dirtyFields.githubUsername || submitCount > 0
                ? errors.githubUsername?.message
                : undefined
            }
            label={attrs.label}
            placeholder={attrs.placeholder}
            startIcon={RiGithubFill}
            {...field}
          />
        </div>
      )}
    />
  );
}
