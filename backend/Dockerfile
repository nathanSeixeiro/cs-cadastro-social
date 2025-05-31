FROM node:18-alpine

# Variáveis de ambiente para timezone e locale
ENV TZ=America/Sao_Paulo \
    LANG=pt_BR.UTF-8 \
    LANGUAGE=pt_BR:pt:en \
    LC_ALL=pt_BR.UTF-8

# Diretório de trabalho
WORKDIR /usr/src/app

# Instala dependências do sistema (tzdata e openssl)
RUN apk add --no-cache tzdata openssl

# Configura timezone
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# Copia pacotes e instala dependências
COPY package*.json ./
RUN npm install

# Copia o restante da aplicação
COPY . .

# Gera o client do Prisma com o binário certo para Alpine
RUN npx prisma generate

# Build do projeto (caso use Next.js, Vite, etc)
RUN npm run build

# Expõe porta 3000
EXPOSE 3000

# Comando para subir a aplicação
CMD ["npm", "start"]
