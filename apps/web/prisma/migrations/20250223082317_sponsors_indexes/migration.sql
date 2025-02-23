/*
  Warnings:

  - A unique constraint covering the columns `[format,requestId]` on the table `SponsorsAd` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[year,week,adId]` on the table `SponsorsAdSlot` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "SponsorsAd" ALTER COLUMN "imageUrl" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "SponsorsAd_format_requestId_key" ON "SponsorsAd"("format", "requestId");

-- CreateIndex
CREATE UNIQUE INDEX "SponsorsAdSlot_year_week_adId_key" ON "SponsorsAdSlot"("year", "week", "adId");
