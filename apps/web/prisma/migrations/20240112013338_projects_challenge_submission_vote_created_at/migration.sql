-- AlterTable
ALTER TABLE "ProjectsChallengeSubmissionVote" ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP;
