import { RiArrowLeftLine } from 'react-icons/ri';

import { useIntl } from '~/components/intl';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsStatusBadgeCompleted from '~/components/projects/common/status/ProjectsStatusBadgeCompleted';
import Button from '~/components/ui/Button';
import Heading from '~/components/ui/Heading';
import Text from '~/components/ui/Text';

import ProjectsChallengeProgressTag from '../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsPremiumBadge from '../purchase/ProjectsPremiumBadge';
import type { ProjectsTrackItem } from './data/ProjectsTracksData';

type BaseProps = Readonly<{
  isViewerPremium: boolean;
  points: number;
  showProgress: boolean;
  track: ProjectsTrackItem;
}>;

type Props =
  | (BaseProps &
      Readonly<{
        completedCount: number;
        showProgress: true;
        totalCount: number;
      }>)
  | (BaseProps &
      Readonly<{
        showProgress: false;
      }>);

export default function ProjectsTrackPageHeader({
  isViewerPremium,
  points,
  showProgress,
  track,
  ...props
}: Props) {
  const intl = useIntl();
  const { description, title } = track.info;

  return (
    <div className="flex flex-col gap-4">
      <Button
        addonPosition="start"
        className="-ms-4 -mt-2 self-start"
        href="/projects/tracks"
        icon={RiArrowLeftLine}
        label={intl.formatMessage({
          defaultMessage: 'Back to all tracks',
          description: 'Button label to go back to all projects tracks',
          id: 'zpsjf3',
        })}
        variant="tertiary"
      />
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-2">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <Heading level="heading5">{title}</Heading>
            {track.metadata.premium && (
              <ProjectsPremiumBadge size="sm" unlocked={isViewerPremium} />
            )}
            {showProgress &&
              'completedCount' in props &&
              'totalCount' in props &&
              props.completedCount === props.totalCount && (
                <ProjectsStatusBadgeCompleted entity="track" />
              )}
          </div>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <ProjectsChallengeReputationTag points={points} variant="flat" />
            {showProgress &&
              'completedCount' in props &&
              'totalCount' in props && (
                <ProjectsChallengeProgressTag
                  completed={props.completedCount}
                  total={props.totalCount}
                />
              )}
          </div>
        </div>
        <Text color="secondary" size="body2">
          {description}
        </Text>
      </div>
    </div>
  );
}
