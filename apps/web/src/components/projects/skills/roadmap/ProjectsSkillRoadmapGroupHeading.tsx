import clsx from 'clsx';
import { RiFireLine } from 'react-icons/ri';
import { FormattedMessage } from 'react-intl';

import ProjectsChallengeStatusBadgeCompleted from '~/components/projects/challenges/status/ProjectsChallengeStatusBadgeCompleted';
import ProjectsTrackProgressTag from '~/components/projects/tracks/ProjectsTrackProgressTag';
import Text from '~/components/ui/Text';
import { themeTextSubtleColor } from '~/components/ui/theme';

import type { ProjectsSkillRoadmapGroup } from '../types';

type Props = Readonly<{
  group: ProjectsSkillRoadmapGroup;
}>;

export default function ProjectsSkillRoadmapGroupHeading({ group }: Props) {
  const { completed, description, total, points } = group;
  const completedAll = group.completed === group.total;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-col justify-between gap-2 md:flex-row">
        <Text size="body1" weight="medium">
          {group.key}
        </Text>
        {completedAll ? (
          <ProjectsChallengeStatusBadgeCompleted />
        ) : (
          <div
            className={clsx(
              'flex flex-col gap-2 md:flex-row md:gap-4',
              themeTextSubtleColor,
            )}>
            <div className="flex items-center gap-1">
              <RiFireLine className={clsx('size-4')} />
              <Text color="inherit" size="body3">
                <FormattedMessage
                  defaultMessage="+{points} rep (in total)"
                  description="Total rep count increase label in Projects"
                  id="Lvmetb"
                  values={{
                    points,
                  }}
                />
              </Text>
            </div>
            <ProjectsTrackProgressTag
              completed={completed}
              iconClassName="!size-4"
              showProgress={false}
              total={total}
            />
          </div>
        )}
      </div>
      <Text color="secondary" size="body3">
        {description}
      </Text>
    </div>
  );
}
