import { readProjectsChallengeMetadata } from '~/db/projects/ProjectsReader';

import { projectsSkillDetermineParentSkill } from '../skills/data/ProjectsSkillUtils';
import type { ProjectsSkillKey } from '../skills/types';
import { ProjectsReputationPointsConfig } from './ProjectsReputationPointsConfig';

// Profile.
export const projectsReputationProfileSignUpConfig = () => ({
  key: `projects.profile.sign_up`,
  points: ProjectsReputationPointsConfig.PROFILE_SIGN_UP,
});

export const projectsReputationProfileFieldRequiredConfig = () => ({
  key: `projects.profile.field.required`,
  points: ProjectsReputationPointsConfig.PROFILE_FIELD_REQUIRED,
});

export const projectsReputationProfileFieldOptionalConfig = (
  field: string,
) => ({
  key: `projects.profile.field.${field}`,
  points: ProjectsReputationPointsConfig.PROFILE_FIELD_PER_OPTIONAL,
});

export const projectsReputationProfileCompleteConfig = () => ({
  key: `projects.profile.complete`,
  points: ProjectsReputationPointsConfig.PROFILE_COMPLETE,
});

// Sessions.
export const projectsReputationFirstSessionConfig = () => ({
  key: `projects.session.first`,
  points: ProjectsReputationPointsConfig.SESSION_FIRST,
});

// Discussions.
export const projectsReputationDiscussionsCommentConfig = (
  commentId: string,
) => ({
  key: `projects.discussions.comment.${commentId}`,
  points: ProjectsReputationPointsConfig.DISCUSSIONS_COMMENT,
});

export const projectsReputationDiscussionsCommentVoteConfig = (
  voteId: string,
) => ({
  key: `projects.discussions.comment.vote.${voteId}`,
  points: ProjectsReputationPointsConfig.DISCUSSIONS_COMMENT_VOTE,
});

// Submissions.
export async function projectsReputationSubmissionDifficultyConfig(
  challengeSlug: string,
) {
  const challengeMetadata = await readProjectsChallengeMetadata(challengeSlug);

  return {
    key: `projects.submission.${challengeSlug}`,
    points: challengeMetadata.points,
  };
}

export async function projectsReputationSubmissionRoadmapSkillConfig(
  challengeSlug: string,
  skillKey: ProjectsSkillKey,
) {
  const challengeMetadata = await readProjectsChallengeMetadata(challengeSlug);
  const { pointsForSkillGroups } = challengeMetadata;
  const parentSkill = projectsSkillDetermineParentSkill(skillKey)?.key;
  const points: number =
    pointsForSkillGroups[parentSkill || ''] ??
    ProjectsReputationPointsConfig.SUBMISSION_SKILL_DEFAULT;

  return {
    key: `projects.submission.${challengeSlug}.skill.${skillKey}`,
    parentSkillKey: parentSkill as string,
    points,
  };
}

export function projectsReputationSubmissionTechStackConfig(
  challengeSlug: string,
  skillKey: ProjectsSkillKey,
) {
  return {
    key: `projects.submission.${challengeSlug}.stack.${skillKey}`,
    points: ProjectsReputationPointsConfig.SUBMISSION_TECH_STACK,
  };
}

export const projectsReputationSubmissionVoteConfig = (voteId: string) => ({
  key: `projects.submission.vote.${voteId}`,
  points: ProjectsReputationPointsConfig.SUBMISSION_VOTE,
});
