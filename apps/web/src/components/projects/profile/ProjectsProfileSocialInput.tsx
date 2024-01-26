import type { Control } from 'react-hook-form';
import { Controller } from 'react-hook-form';
import { useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import TextInput from '~/components/ui/TextInput';

import type { ProjectsOnboardingProfileStep2FormValues } from '../onboarding/ProjectsOnboardingProfileStep2';
import type { ProjectsEditProfileValues } from '../types';

type Values =
  | ProjectsEditProfileValues
  | ProjectsOnboardingProfileStep2FormValues;

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
    <div className="flex flex-col gap-4">
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={25}
            variant="filled"
          />
        )}
        <Controller
          control={control}
          name="githubUsername"
          render={({ field }) => (
            <TextInput
              description={intl.formatMessage({
                defaultMessage: 'Add your socials so that others can find you!',
                description:
                  'Description for social link input on Projects profile onboarding page',
                id: 'SbE8XR',
              })}
              descriptionStyle="tooltip"
              label={intl.formatMessage({
                defaultMessage: 'GitHub (optional)',
                description:
                  'Label for GitHub link input on Projects profile onboarding page',
                id: 'f6GjzW',
              })}
              {...field}
            />
          )}
        />
      </div>
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={25}
            variant="filled"
          />
        )}
        <Controller
          control={control}
          name="linkedInUsername"
          render={({ field }) => (
            <TextInput
              description={intl.formatMessage({
                defaultMessage: 'Add your socials so that others can find you!',
                description:
                  'Description for social link input on Projects profile onboarding page',
                id: 'SbE8XR',
              })}
              descriptionStyle="tooltip"
              label={intl.formatMessage({
                defaultMessage: 'LinkedIn (optional)',
                description:
                  'Label for LinkedIn link input on Projects profile onboarding page',
                id: 'l1pTwU',
              })}
              {...field}
            />
          )}
        />
      </div>
      <div className="relative">
        {showReputationCountIncreaseTag && (
          <ProjectsChallengeReputationTag
            className="absolute end-0 top-0"
            points={25}
            variant="filled"
          />
        )}
        <Controller
          control={control}
          name="website"
          render={({ field }) => (
            <TextInput
              description={intl.formatMessage({
                defaultMessage: 'Add your socials so that others can find you!',
                description:
                  'Description for social link input on Projects profile onboarding page',
                id: 'SbE8XR',
              })}
              descriptionStyle="tooltip"
              label={intl.formatMessage({
                defaultMessage: 'Personal Website (optional)',
                description:
                  'Label for Personal Website link input on Projects profile onboarding page',
                id: 'rAAfhQ',
              })}
              {...field}
            />
          )}
        />
      </div>
    </div>
  );
}
