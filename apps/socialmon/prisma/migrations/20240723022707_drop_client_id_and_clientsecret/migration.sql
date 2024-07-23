/*
  Warnings:

  - You are about to drop the column `clientId` on the `RedditAccount` table. All the data in the column will be lost.
  - You are about to drop the column `clientSecret` on the `RedditAccount` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "RedditAccount" DROP COLUMN "clientId",
DROP COLUMN "clientSecret";
