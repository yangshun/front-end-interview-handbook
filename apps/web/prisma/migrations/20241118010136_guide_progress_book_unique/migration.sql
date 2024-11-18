/*
  Warnings:

  - You are about to drop the column `category` on the `GuideProgress` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[book,slug,status,userId]` on the table `GuideProgress` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `book` to the `GuideProgress` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "GuidebookItem" AS ENUM ('BEHAVIORAL_INTERVIEW_PLAYBOOK', 'FRONT_END_INTERVIEW_PLAYBOOK', 'FRONT_END_SYSTEM_DESIGN_PLAYBOOK');

-- DropIndex
DROP INDEX "GuideProgress_category_slug_status_userId_key";

-- AlterTable
ALTER TABLE "GuideProgress" DROP COLUMN "category",
ADD COLUMN     "book" "GuidebookItem" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "GuideProgress_book_slug_status_userId_key" ON "GuideProgress"("book", "slug", "status", "userId");
