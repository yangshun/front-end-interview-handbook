-- CreateTable
CREATE TABLE "ProjectsChallengeSubmissionPin" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "submissionId" UUID NOT NULL,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectsChallengeSubmissionPin_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsChallengeSubmissionPin_submissionId_profileId_key" ON "ProjectsChallengeSubmissionPin"("submissionId", "profileId");

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmissionPin" ADD CONSTRAINT "ProjectsChallengeSubmissionPin_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ProjectsChallengeSubmission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmissionPin" ADD CONSTRAINT "ProjectsChallengeSubmissionPin_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
