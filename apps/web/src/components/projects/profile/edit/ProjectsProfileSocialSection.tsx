import { useFormContext } from 'react-hook-form';
import { FormattedMessage } from 'react-intl';

import ProjectsProfileSocialInput from '~/components/projects/profile/edit/ProjectsProfileSocialInput';
import type { ProjectsProfileEditFormValues } from '~/components/projects/types';
import Heading from '~/components/ui/Heading';

import type { ProjectsOnboardingProfileStep2FormValues } from '../../onboarding/ProjectsOnboardingProfileStep2';

type Values =
  | ProjectsOnboardingProfileStep2FormValues
  | ProjectsProfileEditFormValues;

export default function ProjectsProfileSocialSection() {
  const { control } = useFormContext<Values>();

  return (
    <div className="flex flex-col gap-6">
      <Heading level="heading6">
        <FormattedMessage
          defaultMessage="Social links"
          description="Title of social links section of projects profile edit page"
          id="a3gDom"
        />
      </Heading>
      <ProjectsProfileSocialInput control={control} />
    </div>
  );
}
