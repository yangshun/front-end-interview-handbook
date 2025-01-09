-- DropIndex
DROP INDEX "GuideProgress_userId_slug_book_idx";

-- DropIndex
DROP INDEX "QuestionProgress_userId_slug_format_idx";

-- CreateIndex
CREATE INDEX "GuideProgress_userId_book_slug_idx" ON "GuideProgress"("userId", "book", "slug");

-- CreateIndex
CREATE INDEX "LearningSessionProgress_sessionId_idx" ON "LearningSessionProgress"("sessionId");

-- CreateIndex
CREATE INDEX "QuestionProgress_userId_format_slug_idx" ON "QuestionProgress"("userId", "format", "slug");
