-- Manually added, so that uuid_generate_v4() can be used.
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- CreateTable
CREATE TABLE "EmailSubscriber" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EmailSubscribers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Event" (
    "id" BIGSERIAL NOT NULL,
    "userId" UUID NOT NULL,
    "action" TEXT NOT NULL,
    "payload" JSON,
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "referer" VARCHAR,
    "country" TEXT,

    CONSTRAINT "Event_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FeedbackMessage" (
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "message" VARCHAR NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(6) DEFAULT CURRENT_TIMESTAMP,
    "resolved" BOOLEAN NOT NULL DEFAULT false,
    "owner" TEXT DEFAULT 'yangshun',
    "userEmail" TEXT,
    "comments" VARCHAR,
    "metadata" JSON,

    CONSTRAINT "FeedbackMessage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "plan" TEXT,
    "stripeCustomer" TEXT,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "QuestionProgress" (
    "format" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "status" TEXT NOT NULL,
    "createdAt" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" UUID NOT NULL,

    CONSTRAINT "question_progress_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "SitePerformance" (
    "createdAt" TIMESTAMPTZ(6) DEFAULT CURRENT_TIMESTAMP,
    "duration" DOUBLE PRECISION,
    "country" TEXT,
    "userEmail" TEXT,
    "event" TEXT,
    "id" UUID NOT NULL DEFAULT uuid_generate_v4(),
    "url" TEXT,
    "referrer" TEXT,

    CONSTRAINT "SitePerformance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "EmailSubscribers_email_key" ON "EmailSubscriber"("email");

-- AddForeignKey
ALTER TABLE "Event" ADD CONSTRAINT "Event_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "QuestionProgress" ADD CONSTRAINT "QuestionProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Profile"("id") ON DELETE NO ACTION ON UPDATE NO ACTION;
