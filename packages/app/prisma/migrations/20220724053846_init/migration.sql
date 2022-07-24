-- CreateTable
CREATE TABLE "Buffer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "owner" TEXT NOT NULL,
    "publicOwner" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "public" BOOLEAN NOT NULL
);
