import clsx from 'clsx';

import { useIntl } from '~/components/intl';
import ProjectsChallengeReputationTag from '~/components/projects/challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsStatusBadgeCompleted from '~/components/projects/common/status/ProjectsStatusBadgeCompleted';
import Text from '~/components/ui/Text';

import ProjectsChallengeProgressTag from '../../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsPremiumBadge from '../../purchase/ProjectsPremiumBadge';
import type { ProjectsSkillRoadmapSectionParent } from '../types';

type Props = Readonly<{
  group: ProjectsSkillRoadmapSectionParent;
  isViewerPremium: boolean;
}>;

export default function ProjectsSkillRoadmapParentHeading({
  group,
  isViewerPremium,
}: Props) {
  const intl = useIntl();

  const { title, points, premium, totalChallenges, completedChallenges } =
    group;
  const completedAll =
    totalChallenges === completedChallenges && completedChallenges > 0;

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="flex flex-row flex-wrap justify-between gap-2">
        <div className="flex items-center gap-3">
          <Text size="body1" weight="medium">
            {title}
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
                  'Sum of reputation that can be gained from completing skill plans of all child skills',
                description: 'Tooltip for parent skill',
                id: '2SCQ46',
              })}
            />
            <ProjectsChallengeProgressTag
              completed={completedChallenges}
              showProgress={false}
              tooltip={intl.formatMessage({
                defaultMessage:
                  'Number of challenges you have completed across skill plans of child skills',
                description: 'Tooltip for skill group',
                id: '228NCy',
              })}
              total={totalChallenges}
            />
          </div>
        )}
      </div>
    </div>
  );
}
