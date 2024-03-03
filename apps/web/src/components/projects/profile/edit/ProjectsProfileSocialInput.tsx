import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { RiGithubFill, RiGlobalLine, RiLinkedinFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import TextInput from '~/components/ui/TextInput';

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
              errorMessage={formState.errors.githubUsername?.message}
              label={intl.formatMessage({
                defaultMessage: 'GitHub',
                description: 'GitHub profile link field',
                id: 'JOxGrE',
              })}
              placeholder="https://github.com/johndoe"
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
              errorMessage={formState.errors.linkedInUsername?.message}
              label={intl.formatMessage({
                defaultMessage: 'LinkedIn',
                description: 'LinkedIn profile link field',
                id: 'syMsM0',
              })}
              placeholder="https://linkedin.com/in/john-doe"
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
        <Controller
          control={control}
          name="website"
          render={({ field, formState }) => (
            <TextInput
              description={intl.formatMessage({
                defaultMessage: 'Add your socials so that others can find you!',
                description:
                  'Description for social link input on Projects profile onboarding page',
                id: 'SbE8XR',
              })}
              descriptionStyle="tooltip"
              errorMessage={formState.errors.website?.message}
              label={intl.formatMessage({
                defaultMessage: 'Personal website',
                description: 'Personal website link field',
                id: '3JSDTC',
              })}
              placeholder="https://johndoe.com"
              startIcon={RiGlobalLine}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}