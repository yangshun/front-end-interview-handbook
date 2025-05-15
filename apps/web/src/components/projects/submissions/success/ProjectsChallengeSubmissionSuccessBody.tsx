'use client';

import clsx from 'clsx';

import Card from '~/components/ui/Card';

import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';
import type {
  ProjectsSkillRoadmapSectionData,
  ProjectsSkillSummaryItemForSubmission,
  RoadmapSkillsRep,
} from '../../skills/types';
import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';
import ProjectsChallengeSubmissionSuccessLevelingProgress from './ProjectsChallengeSubmissionSuccessLevelingProgress';
import ProjectsChallengeSubmissionSuccessSkillPlanProgress from './ProjectsChallengeSubmissionSuccessSkillPlanProgress';
import ProjectsChallengeSubmissionSuccessTrackProgress from './ProjectsChallengeSubmissionSuccessTrackProgress';

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  currentTrack: ProjectsTrackItem | null;
  gainedPoints: number;
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  roadmapSkillsRepRecords: ReadonlyArray<RoadmapSkillsRep>;
  skills: Readonly<{
    completedSkills: ReadonlyArray<ProjectsSkillSummaryItemForSubmission>;
    incompleteSkills: ReadonlyArray<ProjectsSkillSummaryItemForSubmission>;
  }>;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
}>;

export default function ProjectsChallengeSubmissionSuccessBody({
  isLeveledUp,
  level,
  gainedPoints,
  roadmapSkillsRepRecords,
  currentTrack,
  challengeHistoricalStatuses,
  projectTracks,
  isViewerPremium,
  skills,
}: Props) {
  return (
    <Card
      className={clsx('flex flex-col gap-16 xl:gap-8', 'p-6 md:p-8')}
      classNameOuter="mt-16"
      disableSpotlight={true}
      padding={false}
      pattern={false}>
      <div className="flex flex-col gap-16 md:gap-8">
        <ProjectsChallengeSubmissionSuccessLevelingProgress
          gainedPoints={gainedPoints}
          isLeveledUp={isLeveledUp}
          level={level}
          roadmapSkillsRepRecords={roadmapSkillsRepRecords}
        />
        <ProjectsChallengeSubmissionSuccessTrackProgress
          challengeHistoricalStatuses={challengeHistoricalStatuses}
          currentTrack={currentTrack}
          isViewerPremium={isViewerPremium}
          projectTracks={projectTracks}
        />
        <ProjectsChallengeSubmissionSuccessSkillPlanProgress skills={skills} />
      </div>
    </Card>
  );
}
