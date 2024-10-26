-- CreateTable
CREATE TABLE "Assistido" (
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
    "usuarioId" INTEGER,
    CONSTRAINT "Assistido_usuarioId_fkey" FOREIGN KEY ("usuarioId") REFERENCES "Usuario" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Trabalho" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "profissao" TEXT NOT NULL,
    "atual" BOOLEAN NOT NULL,
    "assistidoId" INTEGER,
    CONSTRAINT "Trabalho_assistidoId_fkey" FOREIGN KEY ("assistidoId") REFERENCES "Assistido" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Informacao_medica" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "descricao" TEXT NOT NULL,
    "assistidoId" INTEGER,
    CONSTRAINT "Informacao_medica_assistidoId_fkey" FOREIGN KEY ("assistidoId") REFERENCES "Assistido" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Endereco" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "rua" TEXT NOT NULL,
    "numero" TEXT NOT NULL,
    "bairro" TEXT NOT NULL,
    "cidade" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "assistidoId" INTEGER,
    CONSTRAINT "Endereco_assistidoId_fkey" FOREIGN KEY ("assistidoId") REFERENCES "Assistido" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Familia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "parentesco" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "assistidoId" INTEGER,
    CONSTRAINT "Familia_assistidoId_fkey" FOREIGN KEY ("assistidoId") REFERENCES "Assistido" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
