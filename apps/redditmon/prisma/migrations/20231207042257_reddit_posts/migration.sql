-- CreateTable
CREATE TABLE "RedditPosts" (
    "id" VARCHAR NOT NULL,
    "title" VARCHAR NOT NULL,
    "content" VARCHAR NOT NULL,
    "postedAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR NOT NULL,
    "foundAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "response" VARCHAR,
    "replied" BOOLEAN NOT NULL DEFAULT false,
    "repliedAt" TIMESTAMP(6),

    CONSTRAINT "RedditPosts_pkey" PRIMARY KEY ("id")
);
