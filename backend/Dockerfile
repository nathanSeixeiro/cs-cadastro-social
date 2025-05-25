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

# Etapa 2: Runtime
FROM node:18-slim

ENV TZ=America/Sao_Paulo \
    LANG=pt_BR.UTF-8 \
    LANGUAGE=pt_BR:pt:en \
    LC_ALL=pt_BR.UTF-8

RUN apt-get update && \
    apt-get install -y tzdata locales && \
    ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone && \
    echo "pt_BR.UTF-8 UTF-8" > /etc/locale.gen && locale-gen pt_BR.UTF-8 && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

WORKDIR /usr/src/app
# Copia apenas os arquivos necessários do builder
COPY --from=builder /usr/src/app .
EXPOSE 3000
CMD ["npm", "start"]
