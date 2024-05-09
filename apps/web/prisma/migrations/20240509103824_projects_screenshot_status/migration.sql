-- CreateEnum
CREATE TYPE "ProjectsChallengeSubmissionScreenshotStatus" AS ENUM ('PENDING', 'COMPLETED', 'FAILED');

-- AlterTable
ALTER TABLE "ProjectsChallengeSubmission" ADD COLUMN     "screenshotStatus" "ProjectsChallengeSubmissionScreenshotStatus" NOT NULL DEFAULT 'PENDING';
