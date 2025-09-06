/*
  Warnings:

  - Made the column `slug` on table `provider_profiles` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "provider_profiles" ALTER COLUMN "slug" SET NOT NULL;
