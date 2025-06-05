/*
  Warnings:

  - The primary key for the `Role` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Role` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `role_id` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Course" DROP CONSTRAINT "Course_userId_fkey";

-- DropForeignKey
ALTER TABLE "Purchase" DROP CONSTRAINT "Purchase_userId_fkey";

-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_role_id_fkey";

-- DropForeignKey
ALTER TABLE "UserProgress" DROP CONSTRAINT "UserProgress_userId_fkey";

-- AlterTable
ALTER TABLE "Role" DROP CONSTRAINT "Role_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" INTEGER NOT NULL DEFAULT 2,
ADD CONSTRAINT "Role_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role_id",
ADD COLUMN     "role_id" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "Role"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserProgress" ADD CONSTRAINT "UserProgress_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Purchase" ADD CONSTRAINT "Purchase_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
