# Use a imagem oficial do Node.js 18.17
FROM node:18-alpine3.17

# Crie uma pasta para a aplicação dentro do container
WORKDIR /usr/src/app

# Instale as dependências do projeto
COPY package*.json ./
RUN npm install
