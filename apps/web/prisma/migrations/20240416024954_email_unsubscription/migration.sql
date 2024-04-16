-- CreateEnum
CREATE TYPE "EmailCategory" AS ENUM ('MARKETING', 'DEALS_AND_PROMOTIONS', 'PRODUCT_ANNOUNCEMENT', 'FEEDBACK_AND_SURVEY', 'NEWSLETTER');

-- CreateTable
CREATE TABLE "EmailSubscription" (
    "id" SERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "category" "EmailCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EmailSubscription_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscription_userId_category_key" ON "EmailSubscription"("userId", "category");

-- AddForeignKey
ALTER TABLE "EmailSubscription" ADD CONSTRAINT "EmailSubscription_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
