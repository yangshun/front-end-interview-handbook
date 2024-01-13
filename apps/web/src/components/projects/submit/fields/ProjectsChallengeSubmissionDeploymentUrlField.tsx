import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionDeploymentUrlAttributes } from './ProjectsChallengeSubmissionDeploymentUrlSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'deploymentUrl';

export default function ProjectsChallengeSubmissionDeploymentUrlField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionDeploymentUrlAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <TextInput
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={formState.errors[fieldName]?.message}
      label={attrs.label}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      type={attrs.type}
      {...field}
    />
  );
}
