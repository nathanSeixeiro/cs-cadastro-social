-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Aviso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quadroAvisoId" INTEGER,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Aviso_quadroAvisoId_fkey" FOREIGN KEY ("quadroAvisoId") REFERENCES "QuadroAviso" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Aviso" ("descricao", "id", "quadroAvisoId", "titulo") SELECT "descricao", "id", "quadroAvisoId", "titulo" FROM "Aviso";
DROP TABLE "Aviso";
ALTER TABLE "new_Aviso" RENAME TO "Aviso";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
