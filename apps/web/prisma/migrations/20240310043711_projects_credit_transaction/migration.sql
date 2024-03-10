-- CreateEnum
CREATE TYPE "ProjectsChallengeCreditType" AS ENUM ('CREDIT', 'DEBIT');

-- DropForeignKey
ALTER TABLE "ProjectsChallengeSession" DROP CONSTRAINT "ProjectsChallengeSession_profileId_fkey";

-- DropForeignKey
ALTER TABLE "ProjectsChallengeSubmission" DROP CONSTRAINT "ProjectsChallengeSubmission_profileId_fkey";

-- CreateTable
CREATE TABLE "ProjectsChallengeAccess" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "slug" TEXT NOT NULL,
    "transactionId" UUID,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectsChallengeAccess_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProjectsChallengeCreditTransaction" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "profileId" UUID NOT NULL,
    "type" "ProjectsChallengeCreditType" NOT NULL,
    "amount" INTEGER NOT NULL,
    "stripeInvoiceId" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectsChallengeCreditTransaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsChallengeAccess_transactionId_key" ON "ProjectsChallengeAccess"("transactionId");

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsChallengeAccess_profileId_slug_key" ON "ProjectsChallengeAccess"("profileId", "slug");

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSession" ADD CONSTRAINT "ProjectsChallengeSession_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeAccess" ADD CONSTRAINT "ProjectsChallengeAccess_transactionId_fkey" FOREIGN KEY ("transactionId") REFERENCES "ProjectsChallengeCreditTransaction"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeAccess" ADD CONSTRAINT "ProjectsChallengeAccess_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeCreditTransaction" ADD CONSTRAINT "ProjectsChallengeCreditTransaction_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "ProjectsChallengeSubmission" ADD CONSTRAINT "ProjectsChallengeSubmission_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
