-- CreateEnum
CREATE TYPE "FeedbackMessageCategory" AS ENUM ('GENERAL', 'BUG', 'FEATURE_REQUEST', 'QUESTION', 'GUIDE', 'INTERVIEWS', 'PROJECTS', 'SPONSORSHIP', 'PURCHASE');

-- AlterTable
ALTER TABLE "FeedbackMessage" ADD COLUMN     "category" "FeedbackMessageCategory";
