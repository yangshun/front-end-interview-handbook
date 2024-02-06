import { RiCheckboxCircleFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';

export default function ProjectsChallengeStatusBadgeCompleted() {
  const intl = useIntl();

  return (
    <Badge
      icon={RiCheckboxCircleFill}
      label={intl.formatMessage({
        defaultMessage: 'Completed',
        description: 'Project completed label',
        id: 'YY7lXv',
      })}
      size="sm"
      variant="success"
    />
  );
}
