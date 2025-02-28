/*
  Warnings:

  - Made the column `address` on table `SponsorsAdRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `agreement` on table `SponsorsAdRequest` required. This step will fail if there are existing NULL values in that column.
  - Made the column `sponsorName` on table `SponsorsAdRequest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "SponsorsAdRequest" ALTER COLUMN "taxNumber" DROP NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "agreement" SET NOT NULL,
ALTER COLUMN "sponsorName" SET NOT NULL;
