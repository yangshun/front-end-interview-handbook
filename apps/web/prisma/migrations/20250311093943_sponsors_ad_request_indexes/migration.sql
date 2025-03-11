-- DropIndex
DROP INDEX "SponsorsAd_format_requestId_key";

-- CreateIndex
CREATE INDEX "SponsorsAd_requestId_idx" ON "SponsorsAd"("requestId");

-- CreateIndex
CREATE INDEX "SponsorsAd_format_idx" ON "SponsorsAd"("format");
