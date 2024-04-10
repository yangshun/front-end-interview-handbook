import clsx from 'clsx';

import ProjectsChallengeFractionalCompletedTag from './ProjectsChallengeFractionalCompletedTag';
import ProjectsChallengeProgressbar from './ProjectsChallengeProgressbar';

type Props = Readonly<{
  completed: number;
  gapClass?: string;
  showProgress?: boolean;
  tooltip?: string;
  total: number;
}>;

export default function ProjectsChallengeProgressTag({
  completed,
  gapClass = 'gap-1',
  showProgress = true,
  tooltip,
  total,
}: Props) {
  return (
    <div className={clsx('flex flex-wrap items-center', gapClass)}>
      <ProjectsChallengeFractionalCompletedTag
        completed={completed}
        tooltip={tooltip}
        total={total}
      />
      {showProgress && (
        <div>
          <ProjectsChallengeProgressbar completed={completed} total={total} />
        </div>
      )}
    </div>
  );
}
