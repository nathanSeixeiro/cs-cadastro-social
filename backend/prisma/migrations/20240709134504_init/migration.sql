-- CreateTable
CREATE TABLE "Aviso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "quadroAvisoId" INTEGER,
    CONSTRAINT "Aviso_quadroAvisoId_fkey" FOREIGN KEY ("quadroAvisoId") REFERENCES "QuadroAviso" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Usuario" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "nome" TEXT NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL
);

-- CreateTable
CREATE TABLE "QuadroAviso" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT
);
