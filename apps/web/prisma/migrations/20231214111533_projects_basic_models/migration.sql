-- CreateEnum
CREATE TYPE "ProjectsProjectSessionStatus" AS ENUM ('IN_PROGRESS', 'STOPPED', 'COMPLETED');

-- CreateTable
CREATE TABLE "ProjectsProfile" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "primaryMotivation" TEXT,
    "secondaryMotivation" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectsProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsProjectSession" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "status" "ProjectsProjectSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stoppedAt" TIMESTAMPTZ(6),

    CONSTRAINT "ProjectsProjectSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsProjectSubmission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "summary" TEXT NOT NULL,
    "repositoryUrl" TEXT NOT NULL,
    "deploymentUrl" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProjectsProjectSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectsProfile" ADD CONSTRAINT "ProjectsProfile_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsProjectSession" ADD CONSTRAINT "ProjectsProjectSession_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsProjectSubmission" ADD CONSTRAINT "ProjectsProjectSubmission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
