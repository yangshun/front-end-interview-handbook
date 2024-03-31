-- AlterTable
ALTER TABLE "ProjectsProfile" ADD COLUMN     "creditsAtStartOfCycle" INTEGER NOT NULL DEFAULT 0;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSession" ADD CONSTRAINT "ProjectsChallengeSession_slug_fkey" FOREIGN KEY ("slug") REFERENCES "ProjectsChallengeDetails"("slug") ON DELETE RESTRICT ON UPDATE CASCADE;
