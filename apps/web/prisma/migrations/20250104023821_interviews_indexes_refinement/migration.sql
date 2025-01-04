-- DropIndex
DROP INDEX "GuideProgress_book_slug_userId_idx";

-- DropIndex
DROP INDEX "LearningSession_key_userId_idx";

-- DropIndex
DROP INDEX "QuestionJavaScriptCommunitySolution_slug_userId_idx";

-- DropIndex
DROP INDEX "QuestionJavaScriptSubmission_slug_userId_idx";

-- DropIndex
DROP INDEX "QuestionProgress_format_slug_userId_idx";

-- DropIndex
DROP INDEX "QuestionUserInterfaceCommunitySolution_slug_userId_idx";

-- DropIndex
DROP INDEX "QuestionUserInterfaceSave_slug_userId_idx";

-- CreateIndex
CREATE INDEX "GuideProgress_userId_idx" ON "GuideProgress"("userId");

-- CreateIndex
CREATE INDEX "GuideProgress_userId_slug_book_idx" ON "GuideProgress"("userId", "slug", "book");

-- CreateIndex
CREATE INDEX "LearningSession_userId_idx" ON "LearningSession"("userId");

-- CreateIndex
CREATE INDEX "LearningSession_userId_key_idx" ON "LearningSession"("userId", "key");

-- CreateIndex
CREATE INDEX "QuestionJavaScriptCommunitySolution_slug_idx" ON "QuestionJavaScriptCommunitySolution"("slug");

-- CreateIndex
CREATE INDEX "QuestionJavaScriptSubmission_userId_slug_idx" ON "QuestionJavaScriptSubmission"("userId", "slug");

-- CreateIndex
CREATE INDEX "QuestionProgress_userId_idx" ON "QuestionProgress"("userId");

-- CreateIndex
CREATE INDEX "QuestionProgress_userId_slug_format_idx" ON "QuestionProgress"("userId", "slug", "format");

-- CreateIndex
CREATE INDEX "QuestionProgress_slug_format_idx" ON "QuestionProgress"("slug", "format");

-- CreateIndex
CREATE INDEX "QuestionUserInterfaceCommunitySolution_slug_idx" ON "QuestionUserInterfaceCommunitySolution"("slug");

-- CreateIndex
CREATE INDEX "QuestionUserInterfaceSave_userId_slug_idx" ON "QuestionUserInterfaceSave"("userId", "slug");
