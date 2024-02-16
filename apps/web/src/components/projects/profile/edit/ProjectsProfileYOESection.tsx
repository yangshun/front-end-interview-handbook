import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';

import ProjectsProfileYOEInput from '../ProjectsProfileYOEInput';
import type { ProjectsProfileOnboardingStep1FormValues } from '../../onboarding/ProjectsOnboardingProfileStep1';

type Values =
  | ProjectsProfileEditFormValues
  | ProjectsProfileOnboardingStep1FormValues;

export default function ProjectsProfileYOESection() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<Values>();
  const watchHasNotStartedWork = watch('hasNotStartedWork');
  const watchYoeReplacementOption = watch('yoeReplacement.option');

  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Experience"
          description="Title of years of experience section of projects profile edit page"
          id="yKuhFo"
        />
      </Heading>
      <ProjectsProfileYOEInput
        control={control}
        errors={errors}
        watchHasNotStartedWork={watchHasNotStartedWork}
        watchYoeReplacementOption={watchYoeReplacementOption}
      />
    </div>
  );
}
