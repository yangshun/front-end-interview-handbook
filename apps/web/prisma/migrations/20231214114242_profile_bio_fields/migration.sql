-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "currentStatus" TEXT,
ADD COLUMN     "githubUsername" TEXT,
ADD COLUMN     "linkedInUsername" TEXT,
ADD COLUMN     "startWorkDate" TIMESTAMP(3),
ADD COLUMN     "title" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "website" TEXT;
