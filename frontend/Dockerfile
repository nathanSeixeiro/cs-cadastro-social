# Etapa de build
FROM node:18-alpine AS builder
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Etapa de produção - servidor estático leve
FROM node:18-alpine AS runner
WORKDIR /app

# Instala um servidor estático para servir os arquivos
RUN npm install -g serve

# Copia apenas os arquivos estáticos
COPY --from=builder /app/dist .

EXPOSE 3000
CMD ["serve", "-s", ".", "-l", "3000"]
