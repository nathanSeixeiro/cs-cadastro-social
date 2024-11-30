# Backend

## Requisitos

- Node.js (versão 10.x ou superior)
- npm (gerenciador de pacotes do Node.js)

## Configuração

1. Clone o repositório:

```sh
git clone https://github.com/nathanSeixeiro/cs-cadastro-social.git
cd backend
```

2. Instale as dependências:

```sh
npm install
```

3. Configure as variáveis de ambiente:

Crie um arquivo `.env` na raiz do diretório `backend` com o

 seguinte

 conteúdo:

```env
JWT_SECRET="sua_chave_secreta"
DATABASE_URL="file:./database/dev.db"
```

4. Configure o Prisma:

```sh
npx prisma migrate dev --name init
npx prisma generate
```

## Scripts Disponíveis

- `npm run dev`: Inicia o servidor em modo de desenvolvimento.
- `npm run build`: Compila o código TypeScript para JavaScript.
- `npm start`: Inicia o servidor em modo de produção.

## Rodando o Servidor

Para rodar o servidor em modo de desenvolvimento:

```sh
npm run dev
```

Para rodar o servidor em modo de produção:

```sh
npm run build
npm start
```

O servidor estará rodando na porta definida na variável de ambiente `PORT` ou na porta `3000` por padrão.

## Endpoints

- `POST /usuarios`: Cria um novo usuário.
- `GET /usuarios/:id`: Retorna um usuário pelo ID.
- `GET /usuarios/email/:email`: Retorna um usuário pelo email.
- `GET /usuarios`: Retorna todos os usuários.
- `PUT /usuarios/:id`: Atualiza um usuário pelo ID.
- `DELETE /usuarios/:id`: Deleta um usuário pelo ID.

## Prisma

Para rodar as migrações do Prisma:

```sh
npx prisma migrate dev --name <nome_da_migracao>
```

Para gerar o cliente Prisma:

```sh
npx prisma generate
```

## Licença

Este projeto está licenciado sob a licença MIT.
