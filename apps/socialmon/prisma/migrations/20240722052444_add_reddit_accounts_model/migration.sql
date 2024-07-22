-- CreateTable
CREATE TABLE "RedditAccount" (
    "username" VARCHAR NOT NULL,
    "password" VARCHAR NOT NULL,
    "clientId" VARCHAR NOT NULL,
    "clientSecret" VARCHAR NOT NULL,

    CONSTRAINT "RedditAccount_pkey" PRIMARY KEY ("username")
);
