# Etapa 1: Build
FROM node:18-alpine AS builder

ENV TZ=America/Sao_Paulo \
    LANG=pt_BR.UTF-8 \
    LANGUAGE=pt_BR:pt:en \
    LC_ALL=pt_BR.UTF-8

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . .
COPY prisma ./prisma
RUN npx prisma generate
RUN npm run build

# Etapa 2: Runtime
FROM node:18-alpine

ENV TZ=America/Sao_Paulo

WORKDIR /usr/src/app

# Dependência para timezone
RUN apk add --no-cache tzdata \
 && cp /usr/share/zoneinfo/${TZ} /etc/localtime \
 && echo "${TZ}" > /etc/timezone

ENV LANG=pt_BR.UTF-8 \
    LANGUAGE=pt_BR:pt:en \
    LC_ALL=pt_BR.UTF-8

# ✅ Aqui está o ponto principal: copie o resultado da imagem anterior
COPY --from=builder /usr/src/app .

EXPOSE 3000

CMD ["npm", "start"]