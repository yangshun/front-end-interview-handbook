'use client';

import type { ProjectsChallengeHistoricalStatuses } from '~/components/projects/challenges/types';

import ProjectsChallengeSubmissionSuccessBody from './ProjectsChallengeSubmissionSuccessBody';
import ProjectsChallengeSubmissionSuccessHero from './ProjectsChallengeSubmissionSuccessHero';
import { projectsChallengeCountCompletedIncludingHistorical } from '../../challenges/utils/ProjectsChallengeUtils';
import type {
  ProjectsSkillRoadmapSectionData,
  RoadmapSkillsRep,
} from '../../skills/types';
import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';

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
  currentTrack,
  challengeHistoricalStatuses,
  isViewerPremium,
}: {
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  currentTrack: ProjectsTrackItem | null;
  gainedPoints: number;
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
}) {
  const badgeList: Array<BadgeItem> = [];
  const [firstCompletedSkill, ...restCompletedSkills] = getCompletedSkills(
    skillsRoadmap,
    isViewerPremium,
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

  if (currentTrack) {
    const completedChallengesCount =
      projectsChallengeCountCompletedIncludingHistorical(
        challengeHistoricalStatuses ?? {},
        currentTrack.challenges,
      );

    if (currentTrack.challenges.length === completedChallengesCount) {
      badgeList.push({
        data: {
          key: currentTrack.info.title,
          label: currentTrack.info.title,
        },
        type: 'track',
      });
    }
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

function getTrack(
  projectTracks: ReadonlyArray<ProjectsTrackItem>,
  isViewerPremium: boolean,
  trackSlug: string,
): ProjectsTrackItem | null {
  const tracks = projectTracks.filter((track) => {
    const { metadata } = track;

    // Filter out non-related track and premium track for non-premium user
    if (metadata.slug !== trackSlug || (metadata.premium && !isViewerPremium)) {
      return false;
    }

    return true;
  });

  return tracks.length > 0 ? tracks[0] : null;
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
  const currentTrack = getTrack(projectTracks, isViewerPremium, trackSlug);
  const badgeList: Array<BadgeItem> = getBadgeList({
    challengeHistoricalStatuses,
    currentTrack,
    gainedPoints,
    isLeveledUp,
    isViewerPremium,
    level,
    skillsRoadmap,
  });

  return (
    <>
      <ProjectsChallengeSubmissionSuccessHero
        badgeList={badgeList}
        challengeNumber={completedChallenges}
        submissionUrl={submissionUrl}
      />
      <ProjectsChallengeSubmissionSuccessBody
        challengeHistoricalStatuses={challengeHistoricalStatuses}
        currentTrack={currentTrack}
        gainedPoints={gainedPoints}
        isLeveledUp={isLeveledUp}
        isViewerPremium={isViewerPremium}
        level={level}
        projectTracks={projectTracks}
        roadmapSkillsRepRecords={roadmapSkillsRepRecords}
        skillsRoadmap={skillsRoadmap}
      />
    </>
  );
}
