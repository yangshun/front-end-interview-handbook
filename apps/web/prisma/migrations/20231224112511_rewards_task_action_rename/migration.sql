/*
  Warnings:

  - You are about to drop the column `task` on the `RewardsTaskCompletion` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,campaign,action]` on the table `RewardsTaskCompletion` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `action` to the `RewardsTaskCompletion` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "RewardsTaskCompletion_userId_campaign_task_key";

-- AlterTable
ALTER TABLE "RewardsTaskCompletion" DROP COLUMN "task",
ADD COLUMN     "action" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "RewardsTaskCompletion_userId_campaign_action_key" ON "RewardsTaskCompletion"("userId", "campaign", "action");
