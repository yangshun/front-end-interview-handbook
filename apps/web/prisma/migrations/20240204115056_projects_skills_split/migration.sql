/*
  Warnings:

  - You are about to drop the column `skills` on the `ProjectsChallengeSession` table. All the data in the column will be lost.
  - You are about to drop the column `skills` on the `ProjectsChallengeSubmission` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectsChallengeSession" DROP COLUMN "skills",
ADD COLUMN     "roadmapSkills" TEXT[],
ADD COLUMN     "techStackSkills" TEXT[];

-- AlterTable
ALTER TABLE "ProjectsChallengeSubmission" DROP COLUMN "skills",
ADD COLUMN     "roadmapSkills" TEXT[],
ADD COLUMN     "techStackSkills" TEXT[];
