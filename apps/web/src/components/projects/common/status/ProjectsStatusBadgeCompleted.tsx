import { RiCheckLine } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsStatusBadgeType } from '~/components/projects/types';
import Badge from '~/components/ui/Badge';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  entity: ProjectsStatusBadgeType;
}>;

export default function ProjectsStatusBadgeCompleted({ entity }: Props) {
  const intl = useIntl();

  const tooltip = (() => {
    switch (entity) {
      case 'challenge':
        return intl.formatMessage({
          defaultMessage: 'You have completed this project',
          description: 'Description for projects completed status',
          id: 'sH/wZI',
        });
      case 'track':
        return intl.formatMessage({
          defaultMessage: 'You have completed this track',
          description: 'Description for projects track completed status',
          id: 'wnW+2J',
        });
      case 'skill':
        return intl.formatMessage({
          defaultMessage: 'You have completed this skill',
          description: 'Description for projects skill completed status',
          id: '8TZX1E',
        });
    }
  })();

  return (
    <Tooltip label={tooltip}>
      <Badge
        icon={RiCheckLine}
        label={intl.formatMessage({
          defaultMessage: 'Completed',
          description: 'Project completed label',
          id: 'YY7lXv',
        })}
        size="sm"
        variant="success"
      />
    </Tooltip>
  );
}
