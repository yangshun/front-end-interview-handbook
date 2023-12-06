/*
  Warnings:

  - You are about to drop the `Event` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `SitePerformance` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_userId_fkey";

-- DropForeignKey
ALTER TABLE "SitePerformance" DROP CONSTRAINT "SitePerformance_userId_fkey";

-- DropTable
DROP TABLE "Event";

-- DropTable
DROP TABLE "SitePerformance";
