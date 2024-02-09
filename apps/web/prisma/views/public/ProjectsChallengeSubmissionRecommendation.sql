SELECT
  "ProjectsChallengeSubmission".id,
  (
    3 * "ProjectsChallengeSubmission".views
  ) AS score
FROM
  "ProjectsChallengeSubmission";