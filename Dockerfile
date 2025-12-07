# Utilise l'image Node officielle
FROM node:21

# Définit le répertoire de travail
WORKDIR /app

# Copie seulement les fichiers de configuration pour installer les dépendances
COPY package*.json ./

# Installe les dépendances à l'intérieur du conteneur
RUN npm install

# Copie le reste du code source
COPY . .

# Expose le port 3000 (React dev server)
EXPOSE 3000

# Lance l'application en mode développement
CMD ["npm", "run", "start"]
