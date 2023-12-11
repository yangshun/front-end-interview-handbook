/*
  Warnings:

  - You are about to drop the `RedditPosts` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RedditPosts";

-- CreateTable
CREATE TABLE "RedditPost" (
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "postedAt" TIMESTAMP(6) NOT NULL,
    "url" VARCHAR NOT NULL,
    "foundAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" VARCHAR,
    "replied" BOOLEAN NOT NULL DEFAULT false,
    "repliedAt" TIMESTAMP(6),

    CONSTRAINT "RedditPost_pkey" PRIMARY KEY ("id")
);
