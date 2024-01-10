import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionRepositoryUrlAttributes } from './ProjectsChallengeSubmissionRepositoryUrlSchema';

export default function ProjectsChallengeSubmissionRepositoryUrlField() {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionRepositoryUrlAttributes(intl);

  return (
    <TextInput
      description={attrs.description}
      descriptionStyle="tooltip"
      label={attrs.label}
      placeholder={attrs.placeholder}
      required={attrs.validation.required}
      type={attrs.type}
    />
  );
}
