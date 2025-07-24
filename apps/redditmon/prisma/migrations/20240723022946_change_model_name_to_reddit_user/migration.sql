/*
  Warnings:

  - You are about to drop the `RedditAccount` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "RedditAccount";

-- CreateTable
CREATE TABLE "RedditUser" (
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,

    CONSTRAINT "RedditUser_pkey" PRIMARY KEY ("username")
);
