/*
  Warnings:

  - A unique constraint covering the columns `[category,slug,status,userId]` on the table `GuideProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "GuideProgress_category_slug_status_userId_key" ON "GuideProgress"("category", "slug", "status", "userId");
