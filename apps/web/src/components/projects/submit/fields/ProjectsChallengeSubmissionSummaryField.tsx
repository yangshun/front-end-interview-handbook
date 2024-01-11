import type { Control } from 'react-hook-form';
import { useController } from 'react-hook-form';
import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionSummaryAttributes } from './ProjectsChallengeSubmissionSummarySchema';
import type { ProjectsChallengeSubmissionFormValues } from '../ProjectsChallengeSubmitPage';

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
    <TextInput
      description={attrs.description}
      descriptionStyle="tooltip"
      errorMessage={formState.errors[fieldName]?.message}
      label={attrs.label}
      maxLength={attrs.validation.maxLength}
      required={attrs.validation.required}
      {...field}
    />
  );
}
