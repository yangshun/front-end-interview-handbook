import { readProjectsChallengeMetadata } from '~/db/projects/ProjectsReader';

import { projectsSkillDetermineGroup } from '../skills/data/ProjectsSkillUtils';
import type { ProjectsSkillKey } from '../skills/types';

// Profile.
export const projectsReputationProfileSignUpConfig = () => ({
  key: `projects.profile.sign_up`,
  points: 20,
});

export const projectsReputationProfileFieldConfig = (field: string) => ({
  key: `projects.profile.field.${field}`,
  points: 100,
});

export const projectsReputationProfileCompleteConfig = () => ({
  key: `projects.profile.complete`,
  points: 50,
});

// Sessions.
export const projectsReputationFirstSessionConfig = () => ({
  key: `projects.session.first`,
  points: 20,
});

// Discussions.
export const projectsReputationDiscussionsCommentConfig = (
  commentId: string,
) => ({
  key: `projects.discussions.comment.${commentId}`,
  points: 20,
});

export const projectsReputationDiscussionsCommentVoteConfig = (
  voteId: string,
) => ({
  key: `projects.discussions.comment.vote.${voteId}`,
  points: 10,
});

// Submissions.
export async function projectsReputationSubmissionDifficultyConfig(
  challengeSlug: string,
) {
  const { challengeMetadata } =
    await readProjectsChallengeMetadata(challengeSlug);

  return {
    key: `projects.submission.${challengeSlug}`,
    points: challengeMetadata.points,
  };
}

const DEFAULT_SKILL_POINTS = 25;

export async function projectsReputationSubmissionRoadmapSkillConfig(
  challengeSlug: string,
  skillKey: ProjectsSkillKey,
) {
  const { challengeMetadata } =
    await readProjectsChallengeMetadata(challengeSlug);
  const { pointsForSkillGroups } = challengeMetadata;
  const skillGroup = projectsSkillDetermineGroup(skillKey);
  const points = pointsForSkillGroups[skillGroup || ''] ?? DEFAULT_SKILL_POINTS;

  return {
    key: `projects.submission.${challengeSlug}.skill.${skillKey}`,
    points,
  };
}

export function projectsReputationSubmissionTechStackConfig(
  challengeSlug: string,
  skillKey: ProjectsSkillKey,
) {
  return {
    key: `projects.submission.${challengeSlug}.stack.${skillKey}`,
    points: 2,
  };
}

export const projectsReputationSubmissionVoteConfig = (voteId: string) => ({
  key: `projects.submission.vote.${voteId}`,
  points: 10,
});
