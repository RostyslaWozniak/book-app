/*
  Warnings:

  - A unique constraint covering the columns `[provider_schedule_id,date]` on the table `provider_schedule_overrides` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "provider_schedule_overrides_provider_schedule_id_date_idx";

-- CreateIndex
CREATE UNIQUE INDEX "provider_schedule_overrides_provider_schedule_id_date_key" ON "provider_schedule_overrides"("provider_schedule_id", "date");
