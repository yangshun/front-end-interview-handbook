-- CreateEnum
CREATE TYPE "ProjectsDiscussionCommentDomain" AS ENUM ('PROJECTS_CHALLENGE', 'PROJECTS_SUBMISSION');

-- CreateTable
CREATE TABLE "ProjectsDiscussionComment" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "entityId" TEXT NOT NULL,
    "domain" "ProjectsDiscussionCommentDomain" NOT NULL,
    "parentCommentId" UUID,
    "body" TEXT NOT NULL,
    "category" TEXT,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectsDiscussionComment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsDiscussionCommentVote" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "commentId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectsDiscussionCommentVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsDiscussionCommentVote_commentId_profileId_key" ON "ProjectsDiscussionCommentVote"("commentId", "profileId");

-- AddForeignKey
ALTER TABLE "ProjectsDiscussionComment" ADD CONSTRAINT "ProjectsDiscussionComment_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsDiscussionComment" ADD CONSTRAINT "ProjectsDiscussionComment_parentCommentId_fkey" FOREIGN KEY ("parentCommentId") REFERENCES "ProjectsDiscussionComment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsDiscussionCommentVote" ADD CONSTRAINT "ProjectsDiscussionCommentVote_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ProjectsDiscussionComment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsDiscussionCommentVote" ADD CONSTRAINT "ProjectsDiscussionCommentVote_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
