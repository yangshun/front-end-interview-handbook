-- CreateEnum
CREATE TYPE "PostRepliedStatus" AS ENUM ('NOT_REPLIED', 'REPLIED_MANUALLY', 'REPLIED_VIA_APP');

-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "ActivityAction" ADD VALUE 'MARKED_AS_REPLIED';
ALTER TYPE "ActivityAction" ADD VALUE 'MARKED_AS_NOT_REPLIED';

-- AlterTable
ALTER TABLE "RedditPost" ADD COLUMN     "replied" "PostRepliedStatus" NOT NULL DEFAULT 'NOT_REPLIED';
