/*
  Warnings:

  - You are about to drop the column `rejectionReason` on the `SponsorsAdRequest` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "SponsorsAdRequest" DROP COLUMN "rejectionReason";

-- CreateTable
CREATE TABLE "SponsorsAdRequestReview" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "comments" TEXT,
    "userId" UUID NOT NULL,
    "requestId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SponsorsAdRequestReview_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "SponsorsAdRequestReview_requestId_key" ON "SponsorsAdRequestReview"("requestId");

-- AddForeignKey
ALTER TABLE "SponsorsAdRequestReview" ADD CONSTRAINT "SponsorsAdRequestReview_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SponsorsAdRequestReview" ADD CONSTRAINT "SponsorsAdRequestReview_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "SponsorsAdRequest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
