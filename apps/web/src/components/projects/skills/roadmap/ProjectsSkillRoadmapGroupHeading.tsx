import clsx from 'clsx';
import { useIntl } from 'react-intl';

import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsStatusBadgeCompleted from '~/components/projects/common/status/ProjectsStatusBadgeCompleted';
import Text from '~/components/ui/Text';

import type { ProjectsSkillRoadmapSectionGroup } from '../types';
import ProjectsChallengeProgressTag from '../../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsPremiumBadge from '../../common/ProjectsPremiumBadge';

type Props = Readonly<{
  group: ProjectsSkillRoadmapSectionGroup;
  isViewerPremium: boolean;
}>;

export default function ProjectsSkillRoadmapGroupHeading({
  group,
  isViewerPremium,
}: Props) {
  const intl = useIntl();

  const { description, points, premium, totalChallenges, completedChallenges } =
    group;
  const completedAll =
    totalChallenges === completedChallenges && completedChallenges > 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <div className="flex items-center gap-3">
          <Text size="body1" weight="medium">
            {group.key}
          </Text>
          {premium && (
            <ProjectsPremiumBadge size="sm" unlocked={isViewerPremium} />
          )}
        </div>
        {completedAll ? (
          <ProjectsStatusBadgeCompleted entity="skill" />
        ) : (
          <div className={clsx('flex gap-4')}>
            <ProjectsChallengeReputationTag
              labelVariant="total"
              points={points}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Sum of reputation that can be gained from completing skill plans of all skills within the group',
                description: 'Tooltip for skill group',
                id: 'A8Sqf/',
              })}
            />
            <ProjectsChallengeProgressTag
              completed={completedChallenges}
              showProgress={false}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Number of challenges you have completed across skill plans within the group',
                description: 'Tooltip for skill group',
                id: 'KBFTuo',
              })}
              total={totalChallenges}
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
