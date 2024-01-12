-- CreateTable
CREATE TABLE "ProjectsChallengeSubmissionVote" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "submissionId" UUID NOT NULL,
    "profileId" UUID NOT NULL,

    CONSTRAINT "ProjectsChallengeSubmissionVote_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsChallengeSubmissionVote_submissionId_profileId_key" ON "ProjectsChallengeSubmissionVote"("submissionId", "profileId");

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmissionVote" ADD CONSTRAINT "ProjectsChallengeSubmissionVote_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ProjectsChallengeSubmission"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmissionVote" ADD CONSTRAINT "ProjectsChallengeSubmissionVote_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
