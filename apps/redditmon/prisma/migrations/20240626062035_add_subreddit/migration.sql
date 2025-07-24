/*
  Warnings:

  - Added the required column `subreddit` to the `RedditPost` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "RedditPost" ADD COLUMN     "subreddit" VARCHAR NOT NULL;
