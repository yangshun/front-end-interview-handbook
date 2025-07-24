-- CreateIndex
CREATE INDEX "Activity_projectId_idx" ON "Activity"("projectId");

-- CreateIndex
CREATE INDEX "Project_slug_idx" ON "Project"("slug");

-- CreateIndex
CREATE INDEX "RedditPost_projectId_idx" ON "RedditPost"("projectId");

-- CreateIndex
CREATE INDEX "RedditPostReply_redditUserId_idx" ON "RedditPostReply"("redditUserId");

-- CreateIndex
CREATE INDEX "RedditPostReply_userId_idx" ON "RedditPostReply"("userId");

-- CreateIndex
CREATE INDEX "RedditUser_projectId_idx" ON "RedditUser"("projectId");
