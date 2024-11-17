/*
  Warnings:

  - A unique constraint covering the columns `[format,slug,status,userId]` on the table `QuestionProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestionProgress_format_slug_status_userId_key" ON "QuestionProgress"("format", "slug", "status", "userId");
