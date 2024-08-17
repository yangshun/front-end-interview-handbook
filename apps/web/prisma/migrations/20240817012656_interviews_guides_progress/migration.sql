-- CreateTable
CREATE TABLE "GuideProgress" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "category" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "GuideProgress_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "GuideProgress" ADD CONSTRAINT "GuideProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
