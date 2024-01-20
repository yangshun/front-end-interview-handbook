-- CreateTable
CREATE TABLE "DiscussionComment" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "entityId" TEXT NOT NULL,
    "domain" TEXT NOT NULL,
    "parentCommentId" UUID,
    "content" TEXT NOT NULL,
    "category" TEXT,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscussionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DiscussionCommentVote" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "commentId" UUID NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "DiscussionCommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "DiscussionCommentVote_commentId_userId_key" ON "DiscussionCommentVote"("commentId", "userId");

-- AddForeignKey
ALTER TABLE "DiscussionComment" ADD CONSTRAINT "DiscussionComment_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DiscussionComment" ADD CONSTRAINT "DiscussionComment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "DiscussionComment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DiscussionCommentVote" ADD CONSTRAINT "DiscussionCommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "DiscussionComment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "DiscussionCommentVote" ADD CONSTRAINT "DiscussionCommentVote_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
