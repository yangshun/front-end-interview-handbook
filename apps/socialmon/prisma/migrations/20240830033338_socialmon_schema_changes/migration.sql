/*
  Warnings:

  - The primary key for the `RedditPost` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `RedditPost` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - A unique constraint covering the columns `[postId,projectId]` on the table `RedditPost` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[projectId,username]` on the table `RedditUser` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `RedditPost` table without a default value. This is not possible if the table is not empty.
  - Added the required column `projectId` to the `RedditPost` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `postId` on the `RedditPostReply` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `projectId` to the `RedditUser` table without a default value. This is not possible if the table is not empty.

*/
-- This is the raw SQL command to enable the citext extension
CREATE EXTENSION IF NOT EXISTS citext;


-- CreateEnum
CREATE TYPE "PostRelevancy" AS ENUM ('RELEVANT', 'IRRELEVANT');

-- CreateEnum
CREATE TYPE "ActivityAction" AS ENUM ('MADE_IRRELEVANT', 'MADE_RELEVANT', 'REPLIED');

-- DropForeignKey
ALTER TABLE "RedditPostReply" DROP CONSTRAINT "RedditPostReply_postId_fkey";

-- DropIndex
DROP INDEX "RedditUser_id_username_key";

-- AlterTable
ALTER TABLE "RedditPost" DROP CONSTRAINT "RedditPost_pkey",
ADD COLUMN     "postId" VARCHAR NOT NULL,
ADD COLUMN     "projectId" UUID NOT NULL,
ADD COLUMN     "relevancy" "PostRelevancy",
DROP COLUMN "id",
ADD COLUMN     "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
ADD CONSTRAINT "RedditPost_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "RedditPostReply" DROP COLUMN "postId",
ADD COLUMN     "postId" UUID NOT NULL;

-- AlterTable
ALTER TABLE "RedditUser" ADD COLUMN     "projectId" UUID NOT NULL;

-- CreateTable
CREATE TABLE "Activity" (
    "id" SERIAL NOT NULL,
    "action" "ActivityAction" NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postId" UUID NOT NULL,
    "projectId" UUID NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Project" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "name" VARCHAR NOT NULL,
    "slug" CITEXT NOT NULL DEFAULT SUBSTRING((gen_random_uuid())::text FROM 1 FOR 8),
    "keywords" TEXT[],
    "subreddits" TEXT[],
    "productsToAdvertise" JSONB NOT NULL,
    "postFilteringPrompt" TEXT NOT NULL,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "RedditPost_postId_projectId_key" ON "RedditPost"("postId", "projectId");

-- CreateIndex
CREATE UNIQUE INDEX "RedditPostReply_postId_key" ON "RedditPostReply"("postId");

-- CreateIndex
CREATE UNIQUE INDEX "RedditUser_projectId_username_key" ON "RedditUser"("projectId", "username");

-- AddForeignKey
ALTER TABLE "RedditPost" ADD CONSTRAINT "RedditPost_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Activity" ADD CONSTRAINT "Activity_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RedditUser" ADD CONSTRAINT "RedditUser_projectId_fkey" FOREIGN KEY ("projectId") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "RedditPostReply" ADD CONSTRAINT "RedditPostReply_postId_fkey" FOREIGN KEY ("postId") REFERENCES "RedditPost"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
