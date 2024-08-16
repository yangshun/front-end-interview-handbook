/*
  Warnings:

  - Added the required column `userId` to the `RedditPostReply` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RedditPostReply" ADD COLUMN     "userId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "RedditPostReply" ADD CONSTRAINT "RedditPostReply_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
