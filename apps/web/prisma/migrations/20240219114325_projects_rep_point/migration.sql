-- CreateTable
CREATE TABLE "ProjectsReputationPoint" (
    "id" SERIAL NOT NULL,
    "profileId" UUID NOT NULL,
    "key" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ProjectsReputationPoint_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProjectsReputationPoint_profileId_key_key" ON "ProjectsReputationPoint"("profileId", "key");

-- AddForeignKey
ALTER TABLE "ProjectsReputationPoint" ADD CONSTRAINT "ProjectsReputationPoint_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "ProjectsProfile"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
