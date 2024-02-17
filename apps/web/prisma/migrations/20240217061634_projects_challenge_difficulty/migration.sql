-- CreateTable
CREATE TABLE "ProjectsChallengeDetails" (
    "slug" TEXT NOT NULL,
    "difficulty" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsChallengeDetails_slug_key" ON "ProjectsChallengeDetails"("slug");
