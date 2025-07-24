/*
  Warnings:

  - You are about to drop the column `foundAt` on the `RedditPost` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RedditPost" DROP COLUMN "foundAt",
ADD COLUMN     "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "keywords" TEXT[];
