/*
  Warnings:

  - Added the required column `appointments` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Reservations" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "place" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "notes" TEXT,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Reservations_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "datecreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "appointments" TEXT NOT NULL
);
INSERT INTO "new_User" ("datecreated", "email", "id", "password", "username") SELECT "datecreated", "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
