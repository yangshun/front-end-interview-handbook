/*
  Warnings:

  - You are about to drop the column `content` on the `DiscussionComment` table. All the data in the column will be lost.
  - Added the required column `body` to the `DiscussionComment` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `domain` on the `DiscussionComment` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "DiscussionCommentDomain" AS ENUM ('PROJECTS_CHALLENGE', 'PROJECTS_SUBMISSION');

-- AlterTable
ALTER TABLE "DiscussionComment" DROP COLUMN "content",
ADD COLUMN     "body" TEXT NOT NULL,
DROP COLUMN "domain",
ADD COLUMN     "domain" "DiscussionCommentDomain" NOT NULL;
