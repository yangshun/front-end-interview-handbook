'use client';

import Card from '~/components/ui/Card';

import ProjectsChallengeSubmissionSuccessLevelingProgress from './ProjectsChallengeSubmissionSuccessLevelingProgress';
import ProjectsChallengeSubmissionSuccessSkillPlanProgress from './ProjectsChallengeSubmissionSuccessSkillPlanProgress';
import ProjectsChallengeSubmissionSuccessTrackProgress from './ProjectsChallengeSubmissionSuccessTrackProgress';
import type { ProjectsChallengeHistoricalStatuses } from '../../challenges/types';
import type {
  ProjectsSkillRoadmapSectionData,
  ProjectsSkillSummaryItemForSubmission,
  RoadmapSkillsRep,
} from '../../skills/types';
import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';

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
      className="flex flex-col gap-16 xl:gap-8"
      classNameOuter="mt-16"
      disableSpotlight={true}
      pattern={false}>
      <div className="grid gap-x-12 gap-y-8 xl:grid-cols-2">
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
