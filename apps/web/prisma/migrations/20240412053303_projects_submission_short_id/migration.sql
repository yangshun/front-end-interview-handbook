/*
  Warnings:

  - A unique constraint covering the columns `[shortId]` on the table `ProjectsChallengeSubmission` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "ProjectsChallengeSubmission" ADD COLUMN     "shortId" CITEXT NOT NULL DEFAULT SUBSTRING((gen_random_uuid())::text FROM 1 FOR 8);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsChallengeSubmission_shortId_key" ON "ProjectsChallengeSubmission"("shortId");
