import { RiLoader5Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import type { ProjectsStatusBadgeType } from '~/components/projects/types';
import Badge from '~/components/ui/Badge';
import Tooltip from '~/components/ui/Tooltip';

type Props = Readonly<{
  entity: ProjectsStatusBadgeType;
}>;

export default function ProjectsStatusBadgeInProgress({ entity }: Props) {
  const intl = useIntl();
  const tooltip = (() => {
    switch (entity) {
      case 'challenge':
        return intl.formatMessage({
          defaultMessage: 'You are currently working on this project',
          description: 'Description for projects in progress status',
          id: 'sCt8M+',
        });
      case 'track':
        return intl.formatMessage({
          defaultMessage: 'You are currently working on this track',
          description: 'Description for projects track in progress status',
          id: '6fcExT',
        });

      case 'skill':
        return intl.formatMessage({
          defaultMessage: 'You are currently working on this skill',
          description: 'Description for projects skill in progress status',
          id: 'mH6g90',
        });
    }
  })();

  return (
    <Tooltip label={tooltip}>
      <Badge
        icon={RiLoader5Line}
        label={intl.formatMessage({
          defaultMessage: 'In progress',
          description: 'Project in progress label',
          id: 'nsk8M8',
        })}
        size="sm"
        variant="warning"
      />
    </Tooltip>
  );
}
