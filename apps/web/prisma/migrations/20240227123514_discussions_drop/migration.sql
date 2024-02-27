/*
  Warnings:

  - You are about to drop the `DiscussionComment` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DiscussionCommentVote` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DiscussionComment" DROP CONSTRAINT "DiscussionComment_parentCommentId_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionComment" DROP CONSTRAINT "DiscussionComment_userId_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionCommentVote" DROP CONSTRAINT "DiscussionCommentVote_commentId_fkey";

-- DropForeignKey
ALTER TABLE "DiscussionCommentVote" DROP CONSTRAINT "DiscussionCommentVote_userId_fkey";

-- DropTable
DROP TABLE "DiscussionComment";

-- DropTable
DROP TABLE "DiscussionCommentVote";

-- DropEnum
DROP TYPE "DiscussionCommentDomain";
