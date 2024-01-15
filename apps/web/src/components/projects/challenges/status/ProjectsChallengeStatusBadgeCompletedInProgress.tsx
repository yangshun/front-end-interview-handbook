import { RiCircleFill } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';

export default function ProjectsChallengeStatusBadgeInProgress() {
  const intl = useIntl();

  return (
    <Badge
      icon={RiCircleFill}
      label={intl.formatMessage({
        defaultMessage: 'In progress',
        description: 'Project in progress label',
        id: 'nsk8M8',
      })}
      size="sm"
      variant="warning"
    />
  );
}
