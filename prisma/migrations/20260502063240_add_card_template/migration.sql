-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Card" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "title" TEXT NOT NULL DEFAULT '',
    "organization" TEXT NOT NULL DEFAULT '',
    "tagline" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL DEFAULT '',
    "phone" TEXT NOT NULL DEFAULT '',
    "website" TEXT NOT NULL DEFAULT '',
    "address" TEXT NOT NULL DEFAULT '',
    "social" TEXT NOT NULL DEFAULT '{}',
    "qrStyle" TEXT NOT NULL DEFAULT 'dots',
    "template" TEXT NOT NULL DEFAULT 'classic',
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Card_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Card" ("address", "email", "firstName", "id", "lastName", "organization", "phone", "qrStyle", "social", "tagline", "title", "updatedAt", "userId", "website") SELECT "address", "email", "firstName", "id", "lastName", "organization", "phone", "qrStyle", "social", "tagline", "title", "updatedAt", "userId", "website" FROM "Card";
DROP TABLE "Card";
ALTER TABLE "new_Card" RENAME TO "Card";
CREATE UNIQUE INDEX "Card_userId_key" ON "Card"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
