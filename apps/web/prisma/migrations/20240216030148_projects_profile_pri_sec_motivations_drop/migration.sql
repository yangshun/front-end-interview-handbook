/*
  Warnings:

  - You are about to drop the column `primaryMotivation` on the `ProjectsProfile` table. All the data in the column will be lost.
  - You are about to drop the column `secondaryMotivation` on the `ProjectsProfile` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectsProfile" DROP COLUMN "primaryMotivation",
DROP COLUMN "secondaryMotivation";
