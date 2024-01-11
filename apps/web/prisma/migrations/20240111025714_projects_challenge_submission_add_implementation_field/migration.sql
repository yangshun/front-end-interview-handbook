/*
  Warnings:

  - Added the required column `implementation` to the `ProjectsChallengeSubmission` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectsChallengeSubmission" ADD COLUMN     "implementation" TEXT NOT NULL;
