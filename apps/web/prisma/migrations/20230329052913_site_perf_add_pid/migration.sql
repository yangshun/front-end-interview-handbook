-- AlterTable
ALTER TABLE "SitePerformance" ADD COLUMN     "clientSHA" TEXT,
ADD COLUMN     "fingerprint" TEXT,
ADD COLUMN     "serverSHA" TEXT,
ADD COLUMN     "userId" UUID;

-- AddForeignKey
ALTER TABLE "SitePerformance" ADD CONSTRAINT "SitePerformance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
