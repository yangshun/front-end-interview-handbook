import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import type { ProjectsEditProfileValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';

import ProjectsProfileYOEInput from '../ProjectsProfileYOEInput';

export default function ProjectsProfileYOESection() {
  const {
    control,
    watch,
    formState: { errors },
  } = useFormContext<ProjectsEditProfileValues>();
  const watchHasNotStartedWork = watch('hasNotStartedWork');
  const watchYoeReplacementOption = watch('yoeReplacement.option');

  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Years of Experience"
          description="Title of years of experience section of projects profile edit page"
          id="nAm1Vk"
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
