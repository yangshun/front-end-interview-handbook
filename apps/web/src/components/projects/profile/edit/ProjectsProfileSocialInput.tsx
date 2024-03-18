import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiGithubFill, RiLinkedinFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import TextInput from '~/components/ui/TextInput';

import ProjectsProfileWebsiteInput from './ProjectsProfileWebsiteInput';
import type { ProjectsOnboardingProfileStep2FormValues } from '../../onboarding/ProjectsOnboardingProfileStep2';
import { projectsReputationProfileFieldConfig } from '../../reputation/ProjectsReputationPointsConfig';
import type { ProjectsProfileEditFormValues } from '../../types';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

type Props = Readonly<{
  control: Control<Values>;
  showReputationCountIncreaseTag?: boolean;
}>;

export default function ProjectsProfileSocialInput({
  control,
  showReputationCountIncreaseTag,
}: Props) {
  const intl = useIntl();

  return (
    <div className="flex flex-col gap-6">
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={projectsReputationProfileFieldConfig('github').points}
            variant="filled"
          />
        )}
        <Controller
          control={control}
          name="githubUsername"
          render={({ field, formState }) => (
            <TextInput
              description={intl.formatMessage({
                defaultMessage: 'Add your socials so that others can find you!',
                description:
                  'Description for social link input on Projects profile onboarding page',
                id: 'SbE8XR',
              })}
              descriptionStyle="tooltip"
              errorMessage={
                formState.dirtyFields.githubUsername ||
                formState.submitCount > 0
                  ? formState.errors.githubUsername?.message
                  : undefined
              }
              label={intl.formatMessage({
                defaultMessage: 'GitHub username',
                description: 'GitHub profile form label',
                id: 'p9IQRJ',
              })}
              placeholder="johndoe"
              startIcon={RiGithubFill}
              {...field}
            />
          )}
        />
      </div>
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={projectsReputationProfileFieldConfig('linkedin').points}
            variant="filled"
          />
        )}
        <Controller
          control={control}
          name="linkedInUsername"
          render={({ field, formState }) => (
            <TextInput
              description={intl.formatMessage({
                defaultMessage: 'Add your socials so that others can find you!',
                description:
                  'Description for social link input on Projects profile onboarding page',
                id: 'SbE8XR',
              })}
              descriptionStyle="tooltip"
              errorMessage={
                formState.dirtyFields.linkedInUsername ||
                formState.submitCount > 0
                  ? formState.errors.linkedInUsername?.message
                  : undefined
              }
              label={intl.formatMessage({
                defaultMessage: 'LinkedIn username',
                description: 'LinkedIn profile form label',
                id: 'kPaVl6',
              })}
              placeholder="john-doe"
              startIcon={RiLinkedinFill}
              {...field}
            />
          )}
        />
      </div>
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={projectsReputationProfileFieldConfig('website').points}
            variant="filled"
          />
        )}
        <ProjectsProfileWebsiteInput control={control} />
      </div>
    </div>
  );
}
