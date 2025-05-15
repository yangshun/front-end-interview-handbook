import Text from '~/components/ui/Text';

import ProjectsChallengeProgressTag from '../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsChallengeReputationTag from '../challenges/metadata/ProjectsChallengeReputationTag';
import ProjectsStatusBadgeCompleted from '../common/status/ProjectsStatusBadgeCompleted';
import type { ProjectsSkillSummaryItemForSubmission } from './types';

type Props = Readonly<{
  skill: ProjectsSkillSummaryItemForSubmission;
}>;

export default function ProjectsSkillAccordionHeader({ skill }: Props) {
  const completed = skill.totalChallenges === skill.completedChallenges;

  return (
    <div className="flex flex-col items-start gap-1.5 text-start">
      <div className="flex items-center gap-2">
        <Text size="body1" weight="medium">
          {skill.label}
        </Text>
        {completed && <ProjectsStatusBadgeCompleted entity="skill" />}
      </div>
      <div className="flex flex-wrap gap-4">
        <ProjectsChallengeReputationTag points={skill.points} variant="flat" />
        <ProjectsChallengeProgressTag
          completed={skill.completedChallenges}
          showProgress={false}
          total={skill.totalChallenges}
        />
      </div>
    </div>
  );
}
