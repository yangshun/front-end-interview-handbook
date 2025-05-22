import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { useIntl } from '~/components/intl';
import TextArea from '~/components/ui/TextArea';

import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';
import { getProjectsChallengeSubmissionSummaryAttributes } from './ProjectsChallengeSubmissionSummarySchema';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'summary';

export default function ProjectsChallengeSubmissionSummaryField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionSummaryAttributes(intl);
  const {
    field,
    formState: { dirtyFields, errors, submitCount },
  } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <TextArea
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
      rows={2}
      {...field}
    />
  );
}
