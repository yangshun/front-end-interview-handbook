-- CreateTable
CREATE TABLE "QuestionDiscussionPost" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "format" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "contents" TEXT NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionDiscussionPost_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "QuestionDiscussionPost" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuestionDiscussionPost" FORCE ROW LEVEL SECURITY;

-- CreateTable
CREATE TABLE "QuestionJavaScriptCommunitySolution" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "writeup" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "language" "QuestionWorkingLanguage" NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionJavaScriptCommunitySolution_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "QuestionJavaScriptCommunitySolution" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuestionJavaScriptCommunitySolution" FORCE ROW LEVEL SECURITY;

-- CreateTable
CREATE TABLE "QuestionUserInterfaceCommunitySolution" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "slug" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "writeup" TEXT NOT NULL,
    "files" TEXT NOT NULL,
    "framework" "QuestionUserInterfaceFramework" NOT NULL,
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "QuestionUserInterfaceCommunitySolution_pkey" PRIMARY KEY ("id")
);
ALTER TABLE "QuestionUserInterfaceCommunitySolution" ENABLE ROW LEVEL SECURITY;
ALTER TABLE "QuestionUserInterfaceCommunitySolution" FORCE ROW LEVEL SECURITY;

-- AddForeignKey
ALTER TABLE "QuestionDiscussionPost" ADD CONSTRAINT "QuestionDiscussionPost_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionJavaScriptCommunitySolution" ADD CONSTRAINT "QuestionJavaScriptCommunitySolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionUserInterfaceCommunitySolution" ADD CONSTRAINT "QuestionUserInterfaceCommunitySolution_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
