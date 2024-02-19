/*
  Warnings:

  - Added the required column `points` to the `ProjectsReputationPoint` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "ProjectsReputationPoint" ADD COLUMN     "points" INTEGER NOT NULL;
