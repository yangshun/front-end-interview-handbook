/*
  Warnings:

  - You are about to drop the `ProjectsProjectSession` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `ProjectsProjectSubmission` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ProjectsChallengeSessionStatus" AS ENUM ('IN_PROGRESS', 'STOPPED', 'COMPLETED');

-- DropForeignKey
ALTER TABLE "ProjectsProjectSession" DROP CONSTRAINT "ProjectsProjectSession_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectsProjectSubmission" DROP CONSTRAINT "ProjectsProjectSubmission_profileId_fkey";

-- DropTable
DROP TABLE "ProjectsProjectSession";

-- DropTable
DROP TABLE "ProjectsProjectSubmission";

-- DropEnum
DROP TYPE "ProjectsProjectSessionStatus";

-- CreateTable
CREATE TABLE "ProjectsChallengeSession" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "ProjectsChallengeSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "stoppedAt" TIMESTAMPTZ(6),

    CONSTRAINT "ProjectsChallengeSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsChallengeSubmission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "deploymentUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectsChallengeSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSession" ADD CONSTRAINT "ProjectsChallengeSession_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmission" ADD CONSTRAINT "ProjectsChallengeSubmission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
