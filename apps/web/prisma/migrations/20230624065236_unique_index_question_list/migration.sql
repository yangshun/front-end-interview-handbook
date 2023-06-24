/*
  Warnings:

  - A unique constraint covering the columns `[sessionId,key]` on the table `QuestionListSessionProgress` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "QuestionListSessionProgress_sessionId_key_key" ON "QuestionListSessionProgress"("sessionId", "key");
