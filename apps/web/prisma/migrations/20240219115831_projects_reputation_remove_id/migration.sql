/*
  Warnings:

  - The primary key for the `ProjectsReputationPoint` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `ProjectsReputationPoint` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "ProjectsReputationPoint" DROP CONSTRAINT "ProjectsReputationPoint_pkey",
DROP COLUMN "id";
