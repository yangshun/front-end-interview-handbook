import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';

import { useIntl } from '~/components/intl';
import TextArea from '~/components/ui/TextArea';

import { getProjectsChallengeSubmissionSummaryAttributes } from './ProjectsChallengeSubmissionSummarySchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmissionForm';

type Props = Readonly<{
  control: Control<ProjectsChallengeSubmissionFormValues>;
}>;

const fieldName = 'summary';

export default function ProjectsChallengeSubmissionSummaryField({
  control,
}: Props) {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionSummaryAttributes(intl);
  const { field, formState } = useController({
    control,
    name: fieldName,
    rules: { required: true },
  });

  return (
    <TextArea
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={
        formState.dirtyFields[fieldName] || formState.submitCount > 0
          ? formState.errors[fieldName]?.message
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
