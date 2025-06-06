/*
  Warnings:

  - Made the column `duration` on table `Chapter` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Chapter" ALTER COLUMN "duration" SET NOT NULL,
ALTER COLUMN "duration" SET DEFAULT 0;
