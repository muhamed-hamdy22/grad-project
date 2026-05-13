/*
  Warnings:

  - You are about to drop the column `courseID` on the `Attachment` table. All the data in the column will be lost.
  - You are about to drop the column `categoryID` on the `Course` table. All the data in the column will be lost.
  - You are about to drop the column `userID` on the `Course` table. All the data in the column will be lost.
  - Added the required column `courseId` to the `Attachment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Course` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."Attachment" DROP CONSTRAINT "Attachment_courseID_fkey";

-- DropIndex
DROP INDEX "public"."Attachment_courseID_idx";

-- AlterTable
ALTER TABLE "public"."Attachment" DROP COLUMN "courseID",
ADD COLUMN     "courseId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Course" DROP COLUMN "categoryID",
DROP COLUMN "userID",
ADD COLUMN     "categoryId" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "price" SET DEFAULT 0;

-- CreateTable
CREATE TABLE "public"."Category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Category_name_key" ON "public"."Category"("name");

-- CreateIndex
CREATE INDEX "Attachment_courseId_idx" ON "public"."Attachment"("courseId");
