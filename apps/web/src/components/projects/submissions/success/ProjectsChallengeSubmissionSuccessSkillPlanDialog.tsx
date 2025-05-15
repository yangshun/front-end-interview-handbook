import clsx from 'clsx';

import type { ProjectsChallengeItem } from '~/components/projects/challenges/types';
import type { ProjectsSkillSummaryItemForSubmission } from '~/components/projects/skills/types';
import ProjectsTrackChallengesList from '~/components/projects/tracks/ProjectsTrackChallengesList';
import Dialog from '~/components/ui/Dialog';
import { themeBackgroundEmphasized } from '~/components/ui/theme';

import ProjectsChallengeProgressTag from '../../challenges/metadata/ProjectsChallengeProgressTag';
import ProjectsChallengeReputationTag from '../../challenges/metadata/ProjectsChallengeReputationTag';

type Props = Readonly<{
  challenges?: ReadonlyArray<ProjectsChallengeItem>;
  currentSkill: ProjectsSkillSummaryItemForSubmission;
  isShown: boolean;
  onClose: () => void;
}>;

export default function ProjectsChallengeSubmissionSuccessSkillPlanDialog({
  challenges,
  currentSkill,
  isShown,
  onClose,
}: Props) {
  if (!challenges) {
    return null;
  }

  return (
    <Dialog
      className={clsx(themeBackgroundEmphasized)}
      isShown={isShown}
      scrollable={true}
      title={currentSkill.label}
      width="screen-md"
      onClose={() => onClose()}>
      <div className={clsx('flex flex-col gap-8')}>
        <div className="flex flex-wrap gap-x-4 gap-y-2">
          <ProjectsChallengeReputationTag
            points={currentSkill.points}
            variant="flat"
          />
          <ProjectsChallengeProgressTag
            completed={currentSkill.completedChallenges}
            total={currentSkill.totalChallenges}
          />
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
