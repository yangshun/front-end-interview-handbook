-- CreateTable
CREATE TABLE "QuestionBookmarkList" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,
    "default" BOOLEAN NOT NULL,

    CONSTRAINT "QuestionBookmarkList_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionBookmark" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "format" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "position" DOUBLE PRECISION NOT NULL,
    "listId" UUID NOT NULL,

    CONSTRAINT "QuestionBookmark_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "QuestionBookmarkList_userId_idx" ON "QuestionBookmarkList"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionBookmarkList_userId_default_key" ON "QuestionBookmarkList"("userId", "default");

-- CreateIndex
CREATE INDEX "QuestionBookmark_listId_idx" ON "QuestionBookmark"("listId");

-- CreateIndex
CREATE INDEX "QuestionBookmark_listId_format_slug_idx" ON "QuestionBookmark"("listId", "format", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "QuestionBookmark_listId_format_slug_key" ON "QuestionBookmark"("listId", "format", "slug");

-- AddForeignKey
ALTER TABLE "QuestionBookmarkList" ADD CONSTRAINT "QuestionBookmarkList_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionBookmark" ADD CONSTRAINT "QuestionBookmark_listId_fkey" FOREIGN KEY ("listId") REFERENCES "QuestionBookmarkList"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
