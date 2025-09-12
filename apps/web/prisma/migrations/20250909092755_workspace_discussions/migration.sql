-- CreateEnum
CREATE TYPE "InterviewsDiscussionCommentDomain" AS ENUM ('QUESTION', 'OFFICIAL_SOLUTION');

-- CreateEnum
CREATE TYPE "InterviewsActivityCategory" AS ENUM ('DISCUSSION', 'DISCUSSION_UPVOTE');

-- CreateTable
CREATE TABLE "InterviewsDiscussionComment" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "entityId" TEXT NOT NULL,
    "domain" "InterviewsDiscussionCommentDomain" NOT NULL,
    "body" TEXT NOT NULL,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "parentCommentId" UUID,
    "repliedToId" UUID,

    CONSTRAINT "InterviewsDiscussionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewsDiscussionCommentVote" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "commentId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "InterviewsDiscussionCommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InterviewsActivity" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "actorId" UUID NOT NULL,
    "recipientId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" "InterviewsActivityCategory" NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "commentId" UUID,
    "voteId" UUID,

    CONSTRAINT "InterviewsActivity_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "InterviewsDiscussionComment_entityId_idx" ON "InterviewsDiscussionComment"("entityId");

-- CreateIndex
CREATE INDEX "InterviewsDiscussionComment_profileId_idx" ON "InterviewsDiscussionComment"("profileId");

-- CreateIndex
CREATE INDEX "InterviewsDiscussionCommentVote_commentId_idx" ON "InterviewsDiscussionCommentVote"("commentId");

-- CreateIndex
CREATE INDEX "InterviewsDiscussionCommentVote_profileId_idx" ON "InterviewsDiscussionCommentVote"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewsDiscussionCommentVote_commentId_profileId_key" ON "InterviewsDiscussionCommentVote"("commentId", "profileId");

-- CreateIndex
CREATE UNIQUE INDEX "InterviewsActivity_voteId_key" ON "InterviewsActivity"("voteId");

-- CreateIndex
CREATE INDEX "InterviewsActivity_actorId_idx" ON "InterviewsActivity"("actorId");

-- CreateIndex
CREATE INDEX "InterviewsActivity_recipientId_idx" ON "InterviewsActivity"("recipientId");

-- AddForeignKey
ALTER TABLE "InterviewsDiscussionComment" ADD CONSTRAINT "InterviewsDiscussionComment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "InterviewsDiscussionComment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InterviewsDiscussionComment" ADD CONSTRAINT "InterviewsDiscussionComment_repliedToId_fkey" FOREIGN KEY ("repliedToId") REFERENCES "InterviewsDiscussionComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewsDiscussionComment" ADD CONSTRAINT "InterviewsDiscussionComment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InterviewsDiscussionCommentVote" ADD CONSTRAINT "InterviewsDiscussionCommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "InterviewsDiscussionComment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InterviewsDiscussionCommentVote" ADD CONSTRAINT "InterviewsDiscussionCommentVote_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "InterviewsActivity" ADD CONSTRAINT "InterviewsActivity_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "InterviewsDiscussionComment"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewsActivity" ADD CONSTRAINT "InterviewsActivity_voteId_fkey" FOREIGN KEY ("voteId") REFERENCES "InterviewsDiscussionCommentVote"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewsActivity" ADD CONSTRAINT "InterviewsActivity_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterviewsActivity" ADD CONSTRAINT "InterviewsActivity_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE CASCADE;
