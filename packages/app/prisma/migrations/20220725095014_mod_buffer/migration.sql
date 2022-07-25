/*
  Warnings:

  - The primary key for the `Buffer` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `public` on the `Buffer` table. All the data in the column will be lost.
  - Added the required column `content` to the `Buffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `expiryDate` to the `Buffer` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isPublic` to the `Buffer` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Buffer" (
    "owner" TEXT NOT NULL PRIMARY KEY,
    "publicOwner" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "expiryDate" DATETIME NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "id" TEXT NOT NULL
);
INSERT INTO "new_Buffer" ("date", "id", "owner", "publicOwner", "type") SELECT "date", "id", "owner", "publicOwner", "type" FROM "Buffer";
DROP TABLE "Buffer";
ALTER TABLE "new_Buffer" RENAME TO "Buffer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
