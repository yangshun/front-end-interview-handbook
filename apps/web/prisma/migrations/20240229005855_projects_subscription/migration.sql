-- CreateEnum
CREATE TYPE "ProjectsSubscriptionPlan" AS ENUM ('MONTH', 'ANNUAL');

-- AlterTable
ALTER TABLE "ProjectsProfile" ADD COLUMN     "credits" INTEGER NOT NULL DEFAULT 0,
ADD COLUMN     "plan" "ProjectsSubscriptionPlan",
ADD COLUMN     "premium" BOOLEAN NOT NULL DEFAULT false;
