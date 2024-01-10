import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionSummaryAttributes } from './ProjectsChallengeSubmissionSummarySchema';

export default function ProjectsChallengeSubmissionSummaryField() {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionSummaryAttributes(intl);

  return (
    <TextInput
      description={attrs.description}
      descriptionStyle="tooltip"
      label={attrs.label}
      maxLength={attrs.validation.maxLength}
      required={attrs.validation.required}
    />
  );
}
