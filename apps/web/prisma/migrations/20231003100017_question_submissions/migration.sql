-- CreateEnum
CREATE TYPE "QuestionSubmissionResult" AS ENUM ('CORRECT', 'WRONG');

-- CreateEnum
CREATE TYPE "QuestionWorkingLanguage" AS ENUM ('JS', 'TS');

-- CreateEnum
CREATE TYPE "QuestionUserInterfaceFramework" AS ENUM ('REACT', 'VANILLA', 'ANGULAR', 'SVELTE', 'VUE');

-- CreateTable
CREATE TABLE "QuestionJavaScriptSubmission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" "QuestionWorkingLanguage" NOT NULL,
    "result" "QuestionSubmissionResult" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "QuestionJavaScriptSubmission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionUserInterfaceSubmission" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "slug" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "framework" "QuestionUserInterfaceFramework" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "QuestionUserInterfaceSubmission_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "QuestionJavaScriptSubmission" ADD CONSTRAINT "QuestionJavaScriptSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionUserInterfaceSubmission" ADD CONSTRAINT "QuestionUserInterfaceSubmission_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
