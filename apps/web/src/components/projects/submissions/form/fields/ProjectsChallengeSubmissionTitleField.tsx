import { type Control, useController } from 'react-hook-form';

import { useIntl } from '~/components/intl';
import TextInput from '~/components/ui/TextInput';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';
import { getProjectsChallengeSubmissionTitleAttributes } from './ProjectsChallengeSubmissionTitleSchema';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'title';

export default function ProjectsChallengeSubmissionTitleField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionTitleAttributes(intl);
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
      autoFocus={true}
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={
        dirtyFields[fieldName] || submitCount > 0
          ? errors[fieldName]?.message
          : undefined
      }
      label={attrs.label}
      maxLength={attrs.validation.maxLength}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      {...field}
    />
  );
}
