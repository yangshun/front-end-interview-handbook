-- CreateEnum
CREATE TYPE "LearningSessionStatus" AS ENUM ('IN_PROGRESS', 'STOPPED');

-- CreateEnum
CREATE TYPE "LearningSessionProgressStatus" AS ENUM ('COMPLETED');

-- CreateTable
CREATE TABLE "LearningSession" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "status" "LearningSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stoppedAt" TIMESTAMPTZ(6),

    CONSTRAINT "LearningSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LearningSessionProgress" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "key" TEXT NOT NULL,
    "sessionId" UUID NOT NULL,
    "status" "LearningSessionProgressStatus" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "LearningSessionProgress_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LearningSessionProgress_sessionId_key_key" ON "LearningSessionProgress"("sessionId", "key");

-- AddForeignKey
ALTER TABLE "LearningSession" ADD CONSTRAINT "LearningSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "LearningSessionProgress" ADD CONSTRAINT "LearningSessionProgress_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "LearningSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
