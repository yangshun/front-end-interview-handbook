import { useState } from 'react';
import { RiFlashlightFill } from 'react-icons/ri';

import { FormattedMessage, useIntl } from '~/components/intl';
import UserAvatar from '~/components/ui/Avatar/UserAvatar';
import Badge from '~/components/ui/Badge';
import Button from '~/components/ui/Button';
import Text from '~/components/ui/Text';

import useUserProfileWithProjectsProfile from '../../common/useUserProfileWithProjectsProfile';
import ProjectsSkillProgressBreakdownCard from '../../skills/ProjectsSkillProgressBreakdownCard';
import ProjectsSkillRepGainDialog from '../../skills/ProjectsSkillRepGainDialog';
import type { RoadmapSkillsRep } from '../../skills/types';
import { ProjectsLevelingProgressBar } from '../../stats/ProjectsLevelingProgressBar';

const MAX_SKILLS_TO_SHOW = 3;
const SKILLS_CARD_BORDER_COLOR = [
  'border-green-500',
  'border-yellow-500',
  'border-red-500',
];

function getKey(skillRep: RoadmapSkillsRep) {
  return skillRep.key.split('.').at(-1);
}

function groupProjectRepSkill(
  roadmapSkillsRepRecords: ReadonlyArray<RoadmapSkillsRep>,
) {
  const groupedData = roadmapSkillsRepRecords.reduce(
    (acc, curr) => {
      if (!acc.has(curr.parentSkillKey)) {
        acc.set(curr.parentSkillKey, {
          key: curr.parentSkillKey,
          subSkills: [],
          totalPoints: 0,
        });
      }

      const parentSkill = acc.get(curr.parentSkillKey)!;

      parentSkill.subSkills.push({
        key: getKey(curr)!,
        points: curr.points,
      });
      parentSkill.totalPoints += curr.points;

      return acc;
    },
    new Map<
      string,
      {
        key: string;
        subSkills: Array<{
          key: string;
          points: number;
        }>;
        totalPoints: number;
      }
    >(),
  );

  // Sort the skill groups based on totalPoints
  return Array.from(groupedData.values()).sort(
    (a, b) => b.totalPoints - a.totalPoints,
  );
}

type Props = Readonly<{
  gainedPoints: number;
  isLeveledUp: boolean;
  level: number;
  roadmapSkillsRepRecords: ReadonlyArray<RoadmapSkillsRep>;
}>;

export default function ProjectsChallengeSubmissionSuccessLevelingProgress({
  gainedPoints,
  isLeveledUp,
  level,
  roadmapSkillsRepRecords,
}: Props) {
  const intl = useIntl();
  const [showSkillGainedDialog, setShowSkillGainedDialog] = useState(false);
  const { userProfile } = useUserProfileWithProjectsProfile();
  const points = userProfile?.projectsProfile?.points;
  const groupedRoadmapSkillReps = groupProjectRepSkill(roadmapSkillsRepRecords);

  return (
    <div className="grid gap-x-12 gap-y-8 xl:grid-cols-2">
      <div className="flex flex-col gap-6">
        <div className="flex items-center gap-4">
          <Text size="body1" weight="medium">
            <FormattedMessage
              defaultMessage="Leveling progress"
              description="Label for leveling progress on project submission success page"
              id="KgN46v"
            />
          </Text>
          {isLeveledUp && (
            <Badge
              icon={RiFlashlightFill}
              label={intl.formatMessage({
                defaultMessage: 'Level up!',
                description: 'label of Level bage',
                id: 'Vqbpp7',
              })}
              size="sm"
              variant="success"
            />
          )}
        </div>
        <div className="flex items-end gap-6 self-stretch">
          <UserAvatar size="3xl" userProfile={userProfile} />
          {points && (
            <ProjectsLevelingProgressBar
              className="flex-1"
              currentLevel={level}
              currentRepCount={points}
              repIncrease={gainedPoints}
            />
          )}
        </div>
      </div>
      <div className="flex flex-col">
        <div className="flex items-center justify-between">
          <Text color="secondary" size="body2">
            <FormattedMessage
              defaultMessage="You've gained rep in these skills:"
              description="Label for skills gained on project submission success page"
              id="TgOWsI"
            />
          </Text>
          {groupedRoadmapSkillReps.length > MAX_SKILLS_TO_SHOW && (
            <Button
              className="!text-brand -me-3"
              label={intl.formatMessage({
                defaultMessage: 'See all',
                description:
                  'Label for See all button on project submission success page',
                id: 'RZedau',
              })}
              variant="tertiary"
              onClick={() => setShowSkillGainedDialog(true)}
            />
          )}
          <ProjectsSkillRepGainDialog
            isShown={showSkillGainedDialog}
            skillReps={groupedRoadmapSkillReps}
            onClose={() => setShowSkillGainedDialog(false)}
          />
        </div>
        <div className="mt-6 flex flex-col flex-wrap gap-2.5 md:flex-row">
          {groupedRoadmapSkillReps
            .slice(0, MAX_SKILLS_TO_SHOW)
            .map((parent, index) => {
              return (
                <ProjectsSkillProgressBreakdownCard
                  key={parent.key}
                  borderColor={SKILLS_CARD_BORDER_COLOR[index]}
                  skill={{
                    key: parent.key,
                    points: parent.totalPoints,
                  }}
                  subSkills={parent.subSkills}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
