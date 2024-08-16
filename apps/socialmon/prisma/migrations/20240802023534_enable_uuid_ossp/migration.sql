/*
  Warnings:

  - You are about to drop the column `replied` on the `RedditPost` table. All the data in the column will be lost.
  - You are about to drop the column `repliedAt` on the `RedditPost` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `RedditPost` table. All the data in the column will be lost.
  - The primary key for the `RedditUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[id,username]` on the table `RedditUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `permalink` to the `RedditPost` table without a default value. This is not possible if the table is not empty.

*/

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- AlterTable
ALTER TABLE "RedditPost" DROP COLUMN "replied",
DROP COLUMN "repliedAt",
DROP COLUMN "url",
ADD COLUMN     "commentsCount" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "permalink" VARCHAR NOT NULL,
ADD COLUMN     "statsUpdatedAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "upvoteCount" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "RedditUser" DROP CONSTRAINT "RedditUser_pkey",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD CONSTRAINT "RedditUser_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "RedditPostReply" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "content" VARCHAR NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "permalink" VARCHAR NOT NULL,
    "postId" VARCHAR NOT NULL,
    "redditUserId" UUID NOT NULL,

    CONSTRAINT "RedditPostReply_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RedditPostReply_postId_key" ON "RedditPostReply"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "RedditUser_id_username_key" ON "RedditUser"("id", "username");

-- AddForeignKey
ALTER TABLE "RedditPostReply" ADD CONSTRAINT "RedditPostReply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RedditPostReply" ADD CONSTRAINT "RedditPostReply_redditUserId_fkey" FOREIGN KEY ("redditUserId") REFERENCES "RedditUser"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
