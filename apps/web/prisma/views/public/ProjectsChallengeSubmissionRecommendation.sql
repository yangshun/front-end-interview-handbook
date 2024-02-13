-- Counts number of votes from past 14 days and applies a function to it to calculate score
-- Maximum decrease is set to 0.5, which occurs about 3 months in
CREATE OR REPLACE VIEW "ProjectsChallengeSubmissionRecommendationAll" AS SELECT
  s.id,
  (
    SELECT COUNT(*)
    FROM "ProjectsChallengeSubmissionVote" v
    WHERE v."submissionId" = s.id
    AND DATE_PART('DAY', NOW() - v."createdAt") < 14
  ) * GREATEST(
    20 - 10 * LOG(DATE_PART('DAY', NOW() - s."createdAt") +1),
    0.5
  ) AS score
FROM
  "ProjectsChallengeSubmission" s
ORDER BY score DESC, s."createdAt" DESC;

-- Unlike the above, no cutoff to votes (PRD: Prioritise highest community upvotes)
-- I'm unable to bring in a user's data into the view, so I disregarded similar tech stack
-- Similarly, creator YOE is not based on user but rather a general curve
CREATE OR REPLACE VIEW "ProjectsChallengeSubmissionRecommendationLearn" AS SELECT
  s.id,
  (
    SELECT COUNT(*)
    FROM "ProjectsChallengeSubmissionVote" v
    WHERE v."submissionId" = s.id
  ) * (3 * POWER((
    SELECT COALESCE(DATE_PART('DAY', NOW() - p."startWorkDate"), 0) / 365
    FROM "ProjectsChallengeSubmission" q
    INNER JOIN "ProjectsProfile" r on q."profileId" = r.id
    INNER JOIN "Profile" p on r."userId" = p.id
    WHERE q.id = s.id
  ) + 0.5, 0.33333) - 1) AS score
FROM
  "ProjectsChallengeSubmission" s
ORDER BY score DESC, s."createdAt" DESC;

-- Similar problem as the above, so focused on
-- Lowest join date, low YOE, and lowest community upvotes
CREATE OR REPLACE VIEW "ProjectsChallengeSubmissionRecommendationMentor" AS SELECT
  s.id,
  1000 / (
    (0.5 * LOG((
      SELECT COALESCE(DATE_PART('DAY', NOW() - p."createdAt"), 0)
      FROM "ProjectsChallengeSubmission" q
      INNER JOIN "ProjectsProfile" r on q."profileId" = r.id
      INNER JOIN "Profile" p on r."userId" = p.id
      WHERE q.id = s.id
    ) + 1) + 1)
    *
    (10 * LOG((
      SELECT COALESCE(DATE_PART('DAY', NOW() - p."startWorkDate"), 0) / 365
      FROM "ProjectsChallengeSubmission" q
      INNER JOIN "ProjectsProfile" r on q."profileId" = r.id
      INNER JOIN "Profile" p on r."userId" = p.id
      WHERE q.id = s.id
    ) + 1) + 1)
    *
    (2 * LOG((
      SELECT COUNT(*)
      FROM "ProjectsChallengeSubmissionVote" v
      WHERE v."submissionId" = s.id
    ) + 1) + 1)
  ) AS score
FROM
  "ProjectsChallengeSubmission" s
ORDER BY score DESC, s."createdAt" DESC;
