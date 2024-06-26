'use client';

import type { ProjectsChallengeHistoricalStatuses } from '~/components/projects/challenges/types';

import ProjectChallengeSubmissionSuccessHero from './hero/ProjectChallengeSubmissionSuccessHero';
import { projectsChallengeCountCompletedIncludingHistorical } from '../challenges/utils/ProjectsChallengeUtils';
import type { ProjectsSkillRoadmapSectionData } from '../skills/types';
import type { ProjectsTrackItem } from '../tracks/data/ProjectsTracksData';

const MAX_NO_OF_BADGES = 9;

export type BadgeData = {
  key: string;
  label: number | string;
};

export type BadgeItem = {
  data: BadgeData;
  type: 'leveled-up' | 'reputation' | 'skill' | 'track';
};

function getBadgeList(
  isLeveledUp: boolean,
  level: number,
  points: number,
  skillsRoadmap: ProjectsSkillRoadmapSectionData,
  projectTracks: ReadonlyArray<ProjectsTrackItem>,
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses,
) {
  const badgeList: Array<BadgeItem> = [];
  const [firstCompletedSkill, ...restCompletedSkills] =
    getCompletedSkills(skillsRoadmap);
  const [firstCompletedTrack, ...restCompletedTracks] = getCompletedTracks(
    projectTracks,
    challengeHistoricalStatuses,
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

  if (points > 0) {
    badgeList.push({
      data: {
        key: points.toString(),
        label: points,
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

  if (firstCompletedTrack) {
    badgeList.push({
      data: firstCompletedTrack,
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

  if (restCompletedTracks.length) {
    for (const track of restCompletedTracks) {
      badgeList.push({
        data: track,
        type: 'track',
      });
    }
  }

  // We only show max 9 badges
  return badgeList.slice(0, MAX_NO_OF_BADGES);
}

function getCompletedSkills(
  skillsRoadmap: ProjectsSkillRoadmapSectionData,
): Array<BadgeData> {
  return skillsRoadmap
    .map((levelItem) => {
      return levelItem.items.map((group) => {
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

function getCompletedTracks(
  projectTracks: ReadonlyArray<ProjectsTrackItem>,
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses,
): Array<BadgeData> {
  return projectTracks
    .filter((track) => {
      const { challenges } = track;
      const completedCount = projectsChallengeCountCompletedIncludingHistorical(
        challengeHistoricalStatuses ?? {},
        challenges,
      );

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
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  points: number;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  submissionUrl: string;
}>;

export default function ProjectsChallengeSubmissionSuccessPageImpl({
  submissionUrl,
  isLeveledUp,
  level,
  points,
  skillsRoadmap,
  projectTracks,
  challengeHistoricalStatuses,
  completedChallenges,
}: Props) {
  const badgeList: Array<BadgeItem> = getBadgeList(
    isLeveledUp,
    level,
    points,
    skillsRoadmap,
    projectTracks,
    challengeHistoricalStatuses,
  );

  return (
    <ProjectChallengeSubmissionSuccessHero
      badgeList={badgeList}
      challengeNumber={completedChallenges}
      submissionUrl={submissionUrl}
    />
  );
}
