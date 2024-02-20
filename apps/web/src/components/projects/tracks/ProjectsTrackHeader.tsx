import { RiLock2Line } from 'react-icons/ri';
import { useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsTrackProgressTag from '~/components/projects/tracks/ProjectsTrackProgressTag';
import Badge from '~/components/ui/Badge';
import Text from '~/components/ui/Text';

import type { ProjectsTrackItem } from './ProjectsTracksData';
import ProjectsChallengeStatusBadgeCompleted from '../challenges/status/ProjectsChallengeStatusBadgeCompleted';

type Props = Readonly<{ completedCount?: number; track: ProjectsTrackItem }>;

export default function ProjectsTrackHeader({
  completedCount = 0,
  track,
}: Props) {
  const intl = useIntl();

  const { points, metadata, challenges } = track;
  const { description, title } = metadata;
  const completed = completedCount === challenges.length;

  return (
    <div className="flex flex-col items-start gap-1.5 text-start">
      <div className="flex items-center gap-2">
        <Text weight="medium">{title}</Text>
        {metadata.premium && (
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
        {completed && <ProjectsChallengeStatusBadgeCompleted />}
      </div>
      <Text color="subtitle" display="block" size="body2">
        {description}
      </Text>
      <div className="flex flex-wrap gap-4">
        <ProjectsChallengeReputationTag points={points} variant="flat" />
        <ProjectsTrackProgressTag
          completed={completedCount}
          total={challenges.length}
        />
      </div>
    </div>
  );
}
