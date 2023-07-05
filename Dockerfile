# Используем базовый образ Node.js v18.16.1
FROM node:18.16.1

# Установка рабочей директории внутри контейнера
WORKDIR /app

# Копирование package.json и package-lock.json
COPY package*.json ./

# Установка зависимостей проекта
RUN npm install

# Копирование остальных файлов проекта
COPY . .

# Установка команды запуска приложения
CMD [ "node", "index.js" ]
