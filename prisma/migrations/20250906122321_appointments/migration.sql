/*
  Warnings:

  - A unique constraint covering the columns `[provider_schedule_id,start_time]` on the table `appointments` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "provider_schedule_id_start_time_unique" ON "appointments"("provider_schedule_id", "start_time");
