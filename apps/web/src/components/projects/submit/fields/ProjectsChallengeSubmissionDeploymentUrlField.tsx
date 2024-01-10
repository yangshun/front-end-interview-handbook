import { useIntl } from 'react-intl';

import TextInput from '~/components/ui/TextInput';

import { getProjectsChallengeSubmissionDeploymentUrlAttributes } from './ProjectsChallengeSubmissionDeploymentUrlSchema';

export default function ProjectsChallengeSubmissionDeploymentUrlField() {
  const intl = useIntl();
  const attrs = getProjectsChallengeSubmissionDeploymentUrlAttributes(intl);

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
