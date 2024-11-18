/*
  Warnings:

  - Changed the type of `status` on the `GuideProgress` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "GuideProgressStatus" AS ENUM ('COMPLETED');

-- AlterTable
ALTER TABLE "GuideProgress" DROP COLUMN "status",
ADD COLUMN     "status" "GuideProgressStatus" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GuideProgress_category_slug_status_userId_key" ON "GuideProgress"("category", "slug", "status", "userId");
