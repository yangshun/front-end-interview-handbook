/*
  Warnings:

  - Made the column `deploymentUrls` on table `ProjectsChallengeSubmission` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "ProjectsChallengeSubmission" ALTER COLUMN "deploymentUrls" SET NOT NULL;
