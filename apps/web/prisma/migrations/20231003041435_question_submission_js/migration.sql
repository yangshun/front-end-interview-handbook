-- CreateEnum
CREATE TYPE "QuestionJavaScriptSubmissionResult" AS ENUM ('CORRECT', 'WRONG');

-- CreateEnum
CREATE TYPE "QuestionWorkingLanguage" AS ENUM ('JS', 'TS');

-- CreateTable
CREATE TABLE "QuestionJavaScriptSubmission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" "QuestionWorkingLanguage" NOT NULL,
    "result" "QuestionJavaScriptSubmissionResult" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "QuestionJavaScriptSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionJavaScriptSubmission" ADD CONSTRAINT "QuestionJavaScriptSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
