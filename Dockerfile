# Usa una imagen oficial de Node.js
FROM node:20

# Crea un directorio de trabajo en la imagen
WORKDIR /app

# Copia los archivos de dependencias (package.json y package-lock.json)
COPY package*.json ./

# Instala las dependencias
RUN npm install --legacy-peer-deps

# Copia todo el código de tu proyecto
COPY . .

# Expone el puerto 3000 (Railway lo usará automáticamente)
EXPOSE 3000

# Comando para iniciar la app
CMD ["npm", "start"]
