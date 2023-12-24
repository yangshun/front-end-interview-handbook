-- CreateTable
CREATE TABLE "RewardsTaskCompletion" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "userId" UUID NOT NULL,
    "campaign" TEXT NOT NULL,
    "task" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,

    CONSTRAINT "RewardsTaskCompletion_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "RewardsTaskCompletion_userId_campaign_task_key" ON "RewardsTaskCompletion"("userId", "campaign", "task");

-- AddForeignKey
ALTER TABLE "RewardsTaskCompletion" ADD CONSTRAINT "RewardsTaskCompletion_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
