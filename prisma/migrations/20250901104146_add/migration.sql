/*
  Warnings:

  - Made the column `isVerified` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "provider_profiles" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "services" ADD COLUMN     "slug" TEXT;

-- AlterTable
ALTER TABLE "users" ALTER COLUMN "isVerified" SET NOT NULL;
