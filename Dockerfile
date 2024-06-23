# Use uma imagem base oficial do Node.js
FROM node:14

# Crie o diretório de trabalho e copie o package.json e package-lock.json
WORKDIR /usr/src/app
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie o restante do código
COPY . .

# Compile o código (caso esteja usando TypeScript)
RUN npm run build

# Exponha a porta da aplicação
EXPOSE 3000

# Comando para iniciar a aplicação
CMD ["npm", "run", "start:prod"]
