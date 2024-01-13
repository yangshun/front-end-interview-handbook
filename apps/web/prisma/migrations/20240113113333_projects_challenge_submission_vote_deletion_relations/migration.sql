-- DropForeignKey
ALTER TABLE "ProjectsChallengeSubmissionVote" DROP CONSTRAINT "ProjectsChallengeSubmissionVote_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectsChallengeSubmissionVote" DROP CONSTRAINT "ProjectsChallengeSubmissionVote_submissionId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmissionVote" ADD CONSTRAINT "ProjectsChallengeSubmissionVote_submissionId_fkey" FOREIGN KEY ("submissionId") REFERENCES "ProjectsChallengeSubmission"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmissionVote" ADD CONSTRAINT "ProjectsChallengeSubmissionVote_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
