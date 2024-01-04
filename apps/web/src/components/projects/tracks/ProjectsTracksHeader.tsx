import { RiLock2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';

import type { ProjectsTrack } from './ProjectsTracksData';
import ProjectsProjectCountTag from '../stats/ProjectsProjectCountTag';
import ProjectsReputationCountIncreaseTag from '../stats/ProjectsReputationCountIncreaseTag';

type Props = Readonly<{ track: ProjectsTrack }>;

export default function ProjectsTrackHeader({ track }: Props) {
  const {
    isPremium,
    description,
    points,
    totalProjectCount,
    completedProjectCount,
    title,
  } = track;
  const intl = useIntl();

  return (
    <div className="flex flex-col items-start text-start">
      <div className="flex gap-2">
        <Text weight="medium">{title}</Text>
        {isPremium && (
          <Badge
            icon={RiLock2Line}
            label={intl.formatMessage({
              defaultMessage: 'Premium',
              description:
                'Label on Premium badge to indicate premium-only access',
              id: 'aWL34G',
            })}
            size="sm"
            variant="special"
          />
        )}
      </div>
      <Text className="mt-1" size="body2">
        {description}
      </Text>
      <div className="mt-2 flex gap-4">
        <ProjectsReputationCountIncreaseTag points={points} variant="flat" />
        <ProjectsProjectCountTag
          total={totalProjectCount}
          value={completedProjectCount}
        />
      </div>
    </div>
  );
}
