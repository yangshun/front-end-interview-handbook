/*
  Warnings:

  - A unique constraint covering the columns `[username]` on the table `Profile` will be added. If there are existing duplicate values, this will fail.

*/
-- Manually added, so that CITEXT type can be used.
CREATE EXTENSION IF NOT EXISTS "citext";

-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "username" SET DATA TYPE CITEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Profile_username_key" ON "Profile"("username");
