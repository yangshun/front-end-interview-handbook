-- CreateTable
CREATE TABLE "ProjectsNotification" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "category" TEXT NOT NULL,
    "read" BOOLEAN NOT NULL DEFAULT false,
    "data" JSONB NOT NULL,
    "submissionId" UUID,
    "commentId" UUID,

    CONSTRAINT "ProjectsNotification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProjectsNotification" ADD CONSTRAINT "ProjectsNotification_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ProjectsChallengeSubmission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsNotification" ADD CONSTRAINT "ProjectsNotification_commentId_fkey" FOREIGN KEY ("commentId") REFERENCES "ProjectsDiscussionComment"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsNotification" ADD CONSTRAINT "ProjectsNotification_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
