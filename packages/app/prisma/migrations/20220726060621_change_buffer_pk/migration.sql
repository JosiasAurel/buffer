/*
  Warnings:

  - The primary key for the `Buffer` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Buffer" (
    "owner" TEXT NOT NULL,
    "publicOwner" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "content" TEXT NOT NULL,
    "expiryDate" DATETIME NOT NULL,
    "isPublic" BOOLEAN NOT NULL,
    "id" TEXT NOT NULL PRIMARY KEY
);
INSERT INTO "new_Buffer" ("content", "date", "expiryDate", "id", "isPublic", "owner", "publicOwner", "type") SELECT "content", "date", "expiryDate", "id", "isPublic", "owner", "publicOwner", "type" FROM "Buffer";
DROP TABLE "Buffer";
ALTER TABLE "new_Buffer" RENAME TO "Buffer";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
