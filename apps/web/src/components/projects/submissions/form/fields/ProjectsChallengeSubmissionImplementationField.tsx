import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { useIntl } from '~/components/intl';
import RichTextEditor from '~/components/ui/RichTextEditor';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';
import { getProjectsChallengeSubmissionImplementationAttributes } from './ProjectsChallengeSubmissionImplementationSchema';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'implementation';

export default function ProjectsChallengeSubmissionImplementationField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionImplementationAttributes(intl);
  const {
    field,
    formState: { dirtyFields, errors, submitCount },
  } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <RichTextEditor
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={
        dirtyFields[fieldName] || submitCount > 0
          ? errors[fieldName]?.message
          : undefined
      }
      label={attrs.label}
      maxLength={attrs.validation.maxLength}
      required={attrs.validation.required}
      {...field}
      minHeight="300px"
      value={field.value}
      onChange={(newValue) => {
        field.onChange({
          target: {
            value: newValue,
          },
        });
      }}
    />
  );
}
