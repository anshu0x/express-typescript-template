/*
  Warnings:

  - You are about to drop the column `quote` on the `Images` table. All the data in the column will be lost.
  - Added the required column `url` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Images_quote_key";

-- AlterTable
ALTER TABLE "Images" DROP COLUMN "quote",
ADD COLUMN     "url" TEXT NOT NULL;
