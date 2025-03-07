/*
  Warnings:

  - Made the column `sponsorName` on table `SponsorsAd` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SponsorsAd" ALTER COLUMN "sponsorName" SET NOT NULL;
