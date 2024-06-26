import { trpc } from '~/hooks/trpc';

import Spinner from '~/components/ui/Spinner';

import ProjectsChallengeSubmissionSuccessPageImpl from './ProjectsChallengeSubmissionSuccessPageImpl';

type Props = Readonly<{
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  locale: string;
  points: number;
  submissionUrl: string;
}>;

export default function ProjectsChallengeSubmissionSuccessPage({
  isViewerPremium,
  locale,
  submissionUrl,
  level,
  isLeveledUp,
  points,
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
      challengeHistoricalStatuses={challengeHistoricalStatuses}
      completedChallenges={completedChallenges}
      isLeveledUp={isLeveledUp}
      isViewerPremium={isViewerPremium}
      level={level}
      points={points}
      projectTracks={projectTracks}
      skillsRoadmap={skillsRoadmap}
      submissionUrl={submissionUrl}
    />
  );
}
