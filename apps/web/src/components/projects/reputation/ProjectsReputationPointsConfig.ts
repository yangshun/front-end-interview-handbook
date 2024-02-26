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
export const projectsReputationSubmissionVoteConfig = (voteId: string) => ({
  key: `projects.submission.vote.${voteId}`,
  points: 10,
});
