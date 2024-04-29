/*
  Warnings:

  - You are about to drop the `EmailSubscription` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EmailSubscription" DROP CONSTRAINT "EmailSubscription_userId_fkey";

-- DropTable
DROP TABLE "EmailSubscription";

-- DropEnum
DROP TYPE "EmailCategory";
