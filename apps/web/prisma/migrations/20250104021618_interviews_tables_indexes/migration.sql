-- CreateIndex
CREATE INDEX "GuideProgress_book_slug_userId_idx" ON "GuideProgress"("book", "slug", "userId");

-- CreateIndex
CREATE INDEX "LearningSession_key_userId_idx" ON "LearningSession"("key", "userId");

-- CreateIndex
CREATE INDEX "QuestionJavaScriptCommunitySolution_slug_userId_idx" ON "QuestionJavaScriptCommunitySolution"("slug", "userId");

-- CreateIndex
CREATE INDEX "QuestionProgress_format_slug_userId_idx" ON "QuestionProgress"("format", "slug", "userId");

-- CreateIndex
CREATE INDEX "QuestionUserInterfaceCommunitySolution_slug_userId_idx" ON "QuestionUserInterfaceCommunitySolution"("slug", "userId");

-- CreateIndex
CREATE INDEX "QuestionUserInterfaceSave_slug_userId_idx" ON "QuestionUserInterfaceSave"("slug", "userId");
