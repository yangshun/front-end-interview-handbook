-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmission" ADD CONSTRAINT "ProjectsChallengeSubmission_slug_fkey" FOREIGN KEY ("slug") REFERENCES "ProjectsChallengeDetails"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
