import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionTitleAttributes } from './ProjectsChallengeSubmissionTitleSchema';

export default function ProjectsChallengeSubmissionTitleField() {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionTitleAttributes(intl);

  return (
    <TextInput
      description={attrs.description}
      descriptionStyle="tooltip"
      label={attrs.label}
      maxLength={attrs.validation.maxLength}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
    />
  );
}
