-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Informacao_medica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "assistidoId" INTEGER
);
INSERT INTO "new_Informacao_medica" ("assistidoId", "descricao", "id") SELECT "assistidoId", "descricao", "id" FROM "Informacao_medica";
DROP TABLE "Informacao_medica";
ALTER TABLE "new_Informacao_medica" RENAME TO "Informacao_medica";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
