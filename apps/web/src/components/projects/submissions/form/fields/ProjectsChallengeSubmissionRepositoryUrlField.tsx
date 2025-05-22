import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { useIntl } from '~/components/intl';
import TextInput from '~/components/ui/TextInput';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';
import { getProjectsChallengeSubmissionRepositoryUrlAttributes } from './ProjectsChallengeSubmissionRepositoryUrlSchema';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'repositoryUrl';

export default function ProjectsChallengeSubmissionRepositoryUrlField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionRepositoryUrlAttributes(intl);
  const {
    field,
    formState: { dirtyFields, errors, submitCount },
  } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <TextInput
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={
        dirtyFields[fieldName] || submitCount > 0
          ? errors[fieldName]?.message
          : undefined
      }
      label={attrs.label}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      {...field}
    />
  );
}
