'use client';

import type { ProjectsChallengeHistoricalStatuses } from '~/components/projects/challenges/types';

import ProjectChallengeSubmissionSuccessHero from './hero/ProjectChallengeSubmissionSuccessHero';
import ProjectChallengeSubmissionSuccessBody from './ProjectChallengeSubmissionSuccessBody';
import { projectsChallengeCountCompletedIncludingHistorical } from '../challenges/utils/ProjectsChallengeUtils';
import type {
  ProjectsSkillRoadmapSectionData,
  RoadmapSkillsRep,
} from '../skills/types';
import type { ProjectsTrackItem } from '../tracks/data/ProjectsTracksData';

const MAX_NO_OF_BADGES = 9;

export type BadgeData = {
  key: string;
  label: number | string;
};

export type BadgeItem = Readonly<{
  data: BadgeData;
  type: 'leveled-up' | 'reputation' | 'skill' | 'track';
}>;

function getBadgeList({
  isLeveledUp,
  level,
  gainedPoints,
  skillsRoadmap,
  projectTracks,
  challengeHistoricalStatuses,
  isViewerPremium,
  trackSlug,
}: {
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  gainedPoints: number;
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  trackSlug: string;
}) {
  const badgeList: Array<BadgeItem> = [];
  const [firstCompletedSkill, ...restCompletedSkills] = getCompletedSkills(
    skillsRoadmap,
    isViewerPremium,
  );
  const completedTrack = getCompletedTrack(
    projectTracks,
    challengeHistoricalStatuses,
    isViewerPremium,
    trackSlug,
  );

  if (isLeveledUp) {
    badgeList.push({
      data: {
        key: level.toString(),
        label: level,
      },
      type: 'leveled-up',
    });
  }

  if (gainedPoints > 0) {
    badgeList.push({
      data: {
        key: gainedPoints.toString(),
        label: gainedPoints,
      },
      type: 'reputation',
    });
  }

  if (firstCompletedSkill) {
    badgeList.push({
      data: firstCompletedSkill,
      type: 'skill',
    });
  }

  if (completedTrack && completedTrack.length > 0) {
    badgeList.push({
      data: completedTrack[0],
      type: 'track',
    });
  }

  if (restCompletedSkills.length) {
    for (const skill of restCompletedSkills) {
      badgeList.push({
        data: skill,
        type: 'skill',
      });
    }
  }

  // We only show max 9 badges
  return badgeList.slice(0, MAX_NO_OF_BADGES);
}

function getCompletedSkills(
  skillsRoadmap: ProjectsSkillRoadmapSectionData,
  isViewerPremium: boolean,
): Array<BadgeData> {
  return skillsRoadmap
    .map((levelItem) => {
      return levelItem.items
        .filter(({ premium }) => {
          // Filter out premium skills for non-premium user
          if (premium && !isViewerPremium) {
            return false;
          }

          return true;
        })
        .map((group) => {
          return group.items
            .filter(
              ({ completedChallenges, totalChallenges }) =>
                completedChallenges > 0 &&
                completedChallenges === totalChallenges,
            )
            .map(({ key, label }) => ({
              key,
              label,
            }));
        });
    })
    .flat(3);
}

function getCompletedTrack(
  projectTracks: ReadonlyArray<ProjectsTrackItem>,
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses,
  isViewerPremium: boolean,
  trackSlug: string,
): Array<BadgeData> {
  return projectTracks
    .filter((track) => {
      const { challenges, metadata } = track;
      const completedCount = projectsChallengeCountCompletedIncludingHistorical(
        challengeHistoricalStatuses ?? {},
        challenges,
      );

      // Filter out non-related track and premium track for non-premium user
      if (
        metadata.slug !== trackSlug ||
        (metadata.premium && !isViewerPremium)
      ) {
        return false;
      }

      return completedCount === challenges.length;
    })
    .map((track) => ({
      key: track.info.title,
      label: track.info.title,
    }));
}

type Props = Readonly<{
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  completedChallenges: number;
  gainedPoints: number;
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  roadmapSkillsRepRecords: ReadonlyArray<RoadmapSkillsRep>;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  submissionUrl: string;
  trackSlug: string;
}>;

export default function ProjectsChallengeSubmissionSuccessPageImpl({
  submissionUrl,
  isLeveledUp,
  level,
  gainedPoints,
  skillsRoadmap,
  projectTracks,
  challengeHistoricalStatuses,
  completedChallenges,
  roadmapSkillsRepRecords,
  isViewerPremium,
  trackSlug,
}: Props) {
  const badgeList: Array<BadgeItem> = getBadgeList({
    challengeHistoricalStatuses,
    gainedPoints,
    isLeveledUp,
    isViewerPremium,
    level,
    projectTracks,
    skillsRoadmap,
    trackSlug,
  });

  return (
    <>
      <ProjectChallengeSubmissionSuccessHero
        badgeList={badgeList}
        challengeNumber={completedChallenges}
        submissionUrl={submissionUrl}
      />
      <ProjectChallengeSubmissionSuccessBody
        gainedPoints={gainedPoints}
        isLeveledUp={isLeveledUp}
        level={level}
        roadmapSkillsRepRecords={roadmapSkillsRepRecords}
        skillsRoadmap={skillsRoadmap}
      />
    </>
  );
}
