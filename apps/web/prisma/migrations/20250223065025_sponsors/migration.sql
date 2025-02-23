-- CreateEnum
CREATE TYPE "SponsorsAdRequestStatus" AS ENUM ('PENDING', 'REJECTED', 'APPROVED');

-- CreateEnum
CREATE TYPE "SponsorsAdFormat" AS ENUM ('GLOBAL_BANNER', 'IN_CONTENT', 'SPOTLIGHT');

-- CreateTable
CREATE TABLE "SponsorsAdRequest" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "emails" TEXT[],
    "legalName" TEXT NOT NULL,
    "taxNumber" TEXT NOT NULL,
    "address" JSON,
    "signatoryName" TEXT NOT NULL,
    "signatoryTitle" TEXT NOT NULL,
    "status" "SponsorsAdRequestStatus" NOT NULL,

    CONSTRAINT "SponsorsAdRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsorsAd" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "format" "SponsorsAdFormat" NOT NULL,
    "title" TEXT NOT NULL,
    "body" TEXT,
    "url" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "requestId" UUID NOT NULL,

    CONSTRAINT "SponsorsAd_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SponsorsAdSlot" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "year" INTEGER NOT NULL,
    "week" INTEGER NOT NULL,
    "adId" UUID NOT NULL,

    CONSTRAINT "SponsorsAdSlot_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "SponsorsAd" ADD CONSTRAINT "SponsorsAd_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "SponsorsAdRequest"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "SponsorsAdSlot" ADD CONSTRAINT "SponsorsAdSlot_adId_fkey" FOREIGN KEY ("adId") REFERENCES "SponsorsAd"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
