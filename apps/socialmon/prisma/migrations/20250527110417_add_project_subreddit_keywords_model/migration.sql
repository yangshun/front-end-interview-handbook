-- CreateTable
CREATE TABLE "ProjectSubredditKeywords" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "projectId" UUID NOT NULL,
    "keywords" TEXT[],
    "subreddits" TEXT[],

    CONSTRAINT "ProjectSubredditKeywords_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ProjectSubredditKeywords_projectId_idx" ON "ProjectSubredditKeywords"("projectId");

-- AddForeignKey
ALTER TABLE "ProjectSubredditKeywords" ADD CONSTRAINT "ProjectSubredditKeywords_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
