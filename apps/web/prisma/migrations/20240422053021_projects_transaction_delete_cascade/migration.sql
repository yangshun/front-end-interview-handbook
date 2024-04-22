-- DropForeignKey
ALTER TABLE "ProjectsChallengeAccess" DROP CONSTRAINT "ProjectsChallengeAccess_transactionId_fkey";

-- AddForeignKey
ALTER TABLE "ProjectsChallengeAccess" ADD CONSTRAINT "ProjectsChallengeAccess_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "ProjectsChallengeCreditTransaction"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
