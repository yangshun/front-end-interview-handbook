import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';

import type { ProjectsChallengeItem } from '../challenges/types';
import type { RoadmapSkillsRep } from '../skills/types';
import ProjectsChallengeSubmissionSuccessPageImpl from './success/ProjectsChallengeSubmissionSuccessPageImpl';

type Props = Readonly<{
  challenge: ProjectsChallengeItem;
  gainedPoints: number;
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  locale: string;
  roadmapSkillsRepRecords: ReadonlyArray<RoadmapSkillsRep>;
  roadmapSkillsUsed: ReadonlyArray<string>;
  submissionUrl: string;
}>;

export default function ProjectsChallengeSubmissionSuccessPage({
  isViewerPremium,
  locale,
  submissionUrl,
  level,
  isLeveledUp,
  gainedPoints,
  roadmapSkillsRepRecords,
  roadmapSkillsUsed,
  challenge,
}: Props) {
  const { data: progressData, isLoading } =
    trpc.projects.challenges.progress.useQuery({
      locale,
    });

  if (isLoading) {
    return (
      <div className="flex min-h-[120px] w-full items-center justify-center p-24">
        <Spinner size="md" />
      </div>
    );
  }

  // TODO: handle error case

  const {
    challengeHistoricalStatuses,
    projectTracks,
    skillsRoadmap,
    completedChallenges,
  } = progressData!;

  return (
    <ProjectsChallengeSubmissionSuccessPageImpl
      challenge={challenge}
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      completedChallenges={completedChallenges}
      gainedPoints={gainedPoints}
      isLeveledUp={isLeveledUp}
      isViewerPremium={isViewerPremium}
      level={level}
      projectTracks={projectTracks}
      roadmapSkillsRepRecords={roadmapSkillsRepRecords}
      roadmapSkillsUsed={roadmapSkillsUsed}
      skillsRoadmap={skillsRoadmap}
      submissionUrl={submissionUrl}
    />
  );
}
