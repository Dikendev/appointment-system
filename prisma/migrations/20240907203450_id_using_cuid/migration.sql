/*
  Warnings:

  - The primary key for the `clients` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `procedures` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `working_times` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_bookings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "userId" TEXT NOT NULL,
    "clientId" TEXT NOT NULL,
    "procedureId" TEXT NOT NULL,
    "total" TEXT NOT NULL,
    "start_at" DATETIME NOT NULL,
    "finish_at" DATETIME NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL,
    CONSTRAINT "bookings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "bookings_procedureId_fkey" FOREIGN KEY ("procedureId") REFERENCES "procedures" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_bookings" ("clientId", "created_at", "finish_at", "id", "procedureId", "start_at", "total", "updated_at", "userId") SELECT "clientId", "created_at", "finish_at", "id", "procedureId", "start_at", "total", "updated_at", "userId" FROM "bookings";
DROP TABLE "bookings";
ALTER TABLE "new_bookings" RENAME TO "bookings";
CREATE TABLE "new_clients" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_clients" ("created_at", "id", "name", "password", "updated_at") SELECT "created_at", "id", "name", "password", "updated_at" FROM "clients";
DROP TABLE "clients";
ALTER TABLE "new_clients" RENAME TO "clients";
CREATE TABLE "new_procedures" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "required_time_min" INTEGER NOT NULL,
    "procedure_image" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_procedures" ("created_at", "id", "name", "price", "procedure_image", "required_time_min", "updated_at") SELECT "created_at", "id", "name", "price", "procedure_image", "required_time_min", "updated_at" FROM "procedures";
DROP TABLE "procedures";
ALTER TABLE "new_procedures" RENAME TO "procedures";
CREATE UNIQUE INDEX "procedures_name_key" ON "procedures"("name");
CREATE TABLE "new_profiles" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "profile_picture" TEXT,
    "phone_number" TEXT,
    "userId" TEXT,
    "clientId" TEXT,
    CONSTRAINT "profiles_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "profiles_clientId_fkey" FOREIGN KEY ("clientId") REFERENCES "clients" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_profiles" ("clientId", "email", "id", "phone_number", "profile_picture", "userId") SELECT "clientId", "email", "id", "phone_number", "profile_picture", "userId" FROM "profiles";
DROP TABLE "profiles";
ALTER TABLE "new_profiles" RENAME TO "profiles";
CREATE UNIQUE INDEX "profiles_email_key" ON "profiles"("email");
CREATE UNIQUE INDEX "profiles_userId_key" ON "profiles"("userId");
CREATE UNIQUE INDEX "profiles_clientId_key" ON "profiles"("clientId");
CREATE INDEX "userId" ON "profiles"("userId");
CREATE INDEX "clientId" ON "profiles"("clientId");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" DATETIME NOT NULL
);
INSERT INTO "new_users" ("created_at", "id", "name", "password", "updated_at") SELECT "created_at", "id", "name", "password", "updated_at" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE TABLE "new_working_times" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "day_time" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "start" DATETIME NOT NULL,
    "end" DATETIME NOT NULL,
    CONSTRAINT "working_times_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_working_times" ("day_time", "end", "id", "start", "userId") SELECT "day_time", "end", "id", "start", "userId" FROM "working_times";
DROP TABLE "working_times";
ALTER TABLE "new_working_times" RENAME TO "working_times";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
