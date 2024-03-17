import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsTrackProgressTag from '~/components/projects/tracks/ProjectsTrackProgressTag';
import Text from '~/components/ui/Text';

import type { ProjectsTrackItem } from './ProjectsTracksData';
import ProjectsPremiumBadge from '../common/ProjectsPremiumBadge';
import ProjectsStatusBadgeCompleted from '../common/status/ProjectsStatusBadgeCompleted';

type Props = Readonly<{
  completedCount?: number;
  isViewerPremium: boolean;
  track: ProjectsTrackItem;
}>;

export default function ProjectsTrackHeader({
  completedCount = 0,
  isViewerPremium,
  track,
}: Props) {
  const { points, metadata, challenges } = track;
  const { description, title } = metadata;
  const completed = completedCount === challenges.length;

  return (
    <div className="flex flex-col items-start gap-1.5 text-start">
      <div className="flex items-center gap-2">
        <Text size="body1" weight="medium">
          {title}
        </Text>
        {metadata.premium && (
          <ProjectsPremiumBadge unlocked={isViewerPremium} />
        )}
        {completed && <ProjectsStatusBadgeCompleted entity="track" />}
      </div>
      <Text className="block" color="subtitle" size="body2">
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
