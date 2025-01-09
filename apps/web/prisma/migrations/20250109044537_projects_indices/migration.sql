-- CreateIndex
CREATE INDEX "ProjectsChallengeCreditTransaction_profileId_idx" ON "ProjectsChallengeCreditTransaction"("profileId");

-- CreateIndex
CREATE INDEX "ProjectsChallengeSession_profileId_slug_idx" ON "ProjectsChallengeSession"("profileId", "slug");

-- CreateIndex
CREATE INDEX "ProjectsChallengeSubmission_shortId_idx" ON "ProjectsChallengeSubmission"("shortId");

-- CreateIndex
CREATE INDEX "ProjectsChallengeSubmission_profileId_idx" ON "ProjectsChallengeSubmission"("profileId");

-- CreateIndex
CREATE INDEX "ProjectsChallengeSubmission_slug_idx" ON "ProjectsChallengeSubmission"("slug");

-- CreateIndex
CREATE INDEX "ProjectsChallengeSubmissionPin_profileId_idx" ON "ProjectsChallengeSubmissionPin"("profileId");

-- CreateIndex
CREATE INDEX "ProjectsChallengeSubmissionVote_submissionId_idx" ON "ProjectsChallengeSubmissionVote"("submissionId");

-- CreateIndex
CREATE INDEX "ProjectsDiscussionComment_entityId_idx" ON "ProjectsDiscussionComment"("entityId");

-- CreateIndex
CREATE INDEX "ProjectsDiscussionComment_profileId_idx" ON "ProjectsDiscussionComment"("profileId");

-- CreateIndex
CREATE INDEX "ProjectsDiscussionCommentVote_commentId_idx" ON "ProjectsDiscussionCommentVote"("commentId");

-- CreateIndex
CREATE INDEX "ProjectsDiscussionCommentVote_profileId_idx" ON "ProjectsDiscussionCommentVote"("profileId");

-- CreateIndex
CREATE INDEX "ProjectsNotification_profileId_idx" ON "ProjectsNotification"("profileId");

-- CreateIndex
CREATE INDEX "ProjectsProfile_userId_idx" ON "ProjectsProfile"("userId");

-- CreateIndex
CREATE INDEX "ProjectsReputationPoint_profileId_idx" ON "ProjectsReputationPoint"("profileId");
