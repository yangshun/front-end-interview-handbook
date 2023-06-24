-- CreateEnum
CREATE TYPE "QuestionListSessionStatus" AS ENUM ('IN_PROGRESS', 'STOPPED');

-- CreateEnum
CREATE TYPE "QuestionListSessionProgressStatus" AS ENUM ('COMPLETED');

-- CreateTable
CREATE TABLE "QuestionListSession" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "status" "QuestionListSessionStatus" NOT NULL DEFAULT 'IN_PROGRESS',
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "stoppedAt" TIMESTAMPTZ(6),

    CONSTRAINT "QuestionListSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionListSessionProgress" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "key" TEXT NOT NULL,
    "sessionId" UUID NOT NULL,
    "status" "QuestionListSessionProgressStatus" NOT NULL,

    CONSTRAINT "QuestionListSessionProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionListSession" ADD CONSTRAINT "QuestionListSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionListSessionProgress" ADD CONSTRAINT "QuestionListSessionProgress_sessionId_fkey" FOREIGN KEY ("sessionId") REFERENCES "QuestionListSession"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
