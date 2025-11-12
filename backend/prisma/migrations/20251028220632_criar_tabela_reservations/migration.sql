/*
  Warnings:

  - You are about to drop the column `appointments` on the `User` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "password" TEXT NOT NULL,
    "datecreated" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL
);
INSERT INTO "new_User" ("datecreated", "email", "id", "password", "username") SELECT "datecreated", "email", "id", "password", "username" FROM "User";
DROP TABLE "User";
ALTER TABLE "new_User" RENAME TO "User";
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
