import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import Dialog from '~/components/ui/Dialog';
import Text from '~/components/ui/Text';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import ProjectsChallengeProgressTag from '../../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsChallengeReputationTag from '../../challenges/metadata/ProjectsChallengeReputationTag';
import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';
import ProjectsTrackChallengesList from '../../tracks/ProjectsTrackChallengesList';

type Props = Readonly<{
  completedChallengesCount: number;
  isShown: boolean;
  onClose: () => void;
  track: ProjectsTrackItem;
}>;

export default function ProjectChallengeSubmissionTrackDialog({
  completedChallengesCount,
  isShown,
  onClose,
  track,
}: Props) {
  const intl = useIntl();
  const { challenges, points } = track;
  const { description, title } = track.info;

  const showChallenges = completedChallengesCount !== challenges.length;

  return (
    <Dialog
      className={clsx(themeBackgroundEmphasized)}
      isShown={isShown}
      scrollable={true}
      title={
        showChallenges
          ? title
          : intl.formatMessage({
              defaultMessage: 'Try another track',
              description:
                'Label for next track on project submission success page',
              id: '8FAzVY',
            })
      }
      width="screen-md"
      onClose={() => onClose()}>
      <div className={clsx('flex flex-col gap-8')}>
        <div className="flex flex-col gap-1.5">
          <Text color="secondary" size="body2">
            {description}
          </Text>
          <div className="flex flex-wrap gap-x-4 gap-y-2">
            <ProjectsChallengeReputationTag points={points} variant="flat" />
            <ProjectsChallengeProgressTag
              completed={completedChallengesCount}
              total={challenges.length}
            />
          </div>
        </div>
        <ProjectsTrackChallengesList
          challenges={challenges}
          userProfile={null}
          view="submission"
        />
      </div>
    </Dialog>
  );
}
