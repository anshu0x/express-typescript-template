/*
  Warnings:

  - The primary key for the `Images` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `data` on the `Images` table. All the data in the column will be lost.
  - You are about to drop the column `url` on the `Images` table. All the data in the column will be lost.
  - Added the required column `base64Url` to the `Images` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Images` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Images" DROP CONSTRAINT "Images_pkey",
DROP COLUMN "data",
DROP COLUMN "url",
ADD COLUMN     "base64Url" TEXT NOT NULL,
ADD COLUMN     "name" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Images_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Images_id_seq";
