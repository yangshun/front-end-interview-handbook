import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionRepositoryUrlAttributes } from './ProjectsChallengeSubmissionRepositoryUrlSchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmitPage';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'repositoryUrl';

export default function ProjectsChallengeSubmissionRepositoryUrlField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionRepositoryUrlAttributes(intl);
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
