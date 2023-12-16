/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `ProjectsProfile` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "ProjectsProfile_userId_key" ON "ProjectsProfile"("userId");
