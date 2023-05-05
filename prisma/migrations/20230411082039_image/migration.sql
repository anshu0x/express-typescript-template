/*
  Warnings:

  - You are about to drop the column `UserId` on the `Images` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Images" DROP CONSTRAINT "Images_UserId_fkey";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "UserId";
