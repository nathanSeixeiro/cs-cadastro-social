/*
  Warnings:

  - Added the required column `ativo` to the `Assistido` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Assistido" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "data_nascimento" DATETIME NOT NULL,
    "sexo" TEXT NOT NULL,
    "situacao" TEXT NOT NULL,
    "familiar_proximo" BOOLEAN NOT NULL,
    "estado_civil" TEXT NOT NULL,
    "motivo_saiu" TEXT NOT NULL,
    "filhos" BOOLEAN NOT NULL,
    "existe_contato" BOOLEAN NOT NULL,
    "descricao" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL,
    "usuarioId" INTEGER,
    CONSTRAINT "Assistido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Assistido" ("data_nascimento", "descricao", "estado_civil", "existe_contato", "familiar_proximo", "filhos", "id", "motivo_saiu", "nome", "sexo", "situacao", "usuarioId") SELECT "data_nascimento", "descricao", "estado_civil", "existe_contato", "familiar_proximo", "filhos", "id", "motivo_saiu", "nome", "sexo", "situacao", "usuarioId" FROM "Assistido";
DROP TABLE "Assistido";
ALTER TABLE "new_Assistido" RENAME TO "Assistido";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
