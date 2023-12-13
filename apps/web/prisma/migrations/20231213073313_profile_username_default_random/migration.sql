-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "username" SET DEFAULT SUBSTRING((gen_random_uuid())::text FROM 1 FOR 8);
