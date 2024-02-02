-- AlterTable
ALTER TABLE "ProjectsChallengeSession" ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "ProjectsChallengeSubmission" ADD COLUMN     "skills" TEXT[];

-- AlterTable
ALTER TABLE "ProjectsProfile" ADD COLUMN     "skillsProficient" TEXT[],
ADD COLUMN     "skillsToGrow" TEXT[];
