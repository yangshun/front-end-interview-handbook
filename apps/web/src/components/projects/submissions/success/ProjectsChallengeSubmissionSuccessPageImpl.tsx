'use client';

import { orderBy } from 'lodash-es';

import type {
  ProjectsChallengeHistoricalStatuses,
  ProjectsChallengeItem,
} from '~/components/projects/challenges/types';

import { projectsChallengeCountCompletedIncludingHistorical } from '../../challenges/utils/ProjectsChallengeUtils';
import type {
  ProjectsSkillRoadmapSectionData,
  ProjectsSkillSummaryItem,
  ProjectsSkillSummaryItemForSubmission,
  RoadmapSkillsRep,
} from '../../skills/types';
import type { ProjectsTrackItem } from '../../tracks/data/ProjectsTracksData';
import ProjectsChallengeSubmissionSuccessBody from './ProjectsChallengeSubmissionSuccessBody';
import ProjectsChallengeSubmissionSuccessHero from './ProjectsChallengeSubmissionSuccessHero';

const MAX_NO_OF_BADGES = 9;

export type BadgeData = {
  key: string;
  label: number | string;
  parentKey?: string;
};

export type BadgeItem = Readonly<{
  data: BadgeData;
  type: 'leveled-up' | 'reputation' | 'skill' | 'track';
}>;

function getBadgeList({
  challengeHistoricalStatuses,
  completedSkills,
  currentTrack,
  gainedPoints,
  isLeveledUp,
  level,
}: {
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  completedSkills: ReadonlyArray<ProjectsSkillSummaryItem>;
  currentTrack: ProjectsTrackItem | null;
  gainedPoints: number;
  isLeveledUp: boolean;
  level: number;
}) {
  const badgeList: Array<BadgeItem> = [];
  const [firstCompletedSkill, ...restCompletedSkills] = completedSkills;

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

function getSkillPlans({
  isViewerPremium,
  skillsRoadmap,
}: {
  isViewerPremium: boolean;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
}) {
  const skills = skillsRoadmap
    .map((levelItem) => {
      return levelItem.items
        .filter((item) => {
          // Filter out premium skill for non-premium user
          if (item.premium && !isViewerPremium) {
            return false;
          }

          return true;
        })
        .map((parentSkill) => {
          // Add parent skill key which is needed for Badge
          return parentSkill.items.map((subSkill) => ({
            ...subSkill,
            parentKey: parentSkill.key,
            tagClassName: parentSkill.tagClassname,
          }));
        });
    })
    .flat(3);

  const calculateCompletionPercentage = (item: ProjectsSkillSummaryItem) => {
    return item.totalChallenges === 0
      ? 0
      : (item.completedChallenges / item.totalChallenges) * 100;
  };

  return orderBy(skills, [calculateCompletionPercentage], ['desc']);
}

function getRelevantSkills({
  roadmapSkillsUsed,
  skillPlans,
  slug,
}: Readonly<{
  roadmapSkillsUsed: ReadonlyArray<string>;
  skillPlans: ReadonlyArray<ProjectsSkillSummaryItemForSubmission>;
  slug: string;
}>) {
  // Filter out skills based on the skills used in this submission and skill associated with the challenge
  const relevantSkills = skillPlans.filter(
    (item) =>
      roadmapSkillsUsed.includes(item.key) &&
      item.skillRoadmapChallengeSlugs.includes(slug),
  );
  // Filter out incomplete skills
  const incompleteSkills = relevantSkills.filter(
    (item) => item.completedChallenges !== item.totalChallenges,
  );

  // Filter out completed skills
  const completedSkills = relevantSkills.filter(
    (item) => item.completedChallenges === item.totalChallenges,
  );

  return {
    completedSkills,
    incompleteSkills,
  };
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
  challenge: ProjectsChallengeItem;
  challengeHistoricalStatuses: ProjectsChallengeHistoricalStatuses;
  completedChallenges: number;
  gainedPoints: number;
  isLeveledUp: boolean;
  isViewerPremium: boolean;
  level: number;
  projectTracks: ReadonlyArray<ProjectsTrackItem>;
  roadmapSkillsRepRecords: ReadonlyArray<RoadmapSkillsRep>;
  roadmapSkillsUsed: ReadonlyArray<string>;
  skillsRoadmap: ProjectsSkillRoadmapSectionData;
  submissionUrl: string;
}>;

export default function ProjectsChallengeSubmissionSuccessPageImpl({
  challenge,
  challengeHistoricalStatuses,
  completedChallenges,
  gainedPoints,
  isLeveledUp,
  isViewerPremium,
  level,
  projectTracks,
  roadmapSkillsRepRecords,
  roadmapSkillsUsed,
  skillsRoadmap,
  submissionUrl,
}: Props) {
  const { slug, track } = challenge.metadata;

  const skillPlans = getSkillPlans({ isViewerPremium, skillsRoadmap });
  const skills = getRelevantSkills({ roadmapSkillsUsed, skillPlans, slug });

  const currentTrack = getTrack(projectTracks, isViewerPremium, track);
  const badgeList: Array<BadgeItem> = getBadgeList({
    challengeHistoricalStatuses,
    completedSkills: skills.completedSkills,
    currentTrack,
    gainedPoints,
    isLeveledUp,
    level,
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
        skills={skills}
        skillsRoadmap={skillsRoadmap}
      />
    </>
  );
}
