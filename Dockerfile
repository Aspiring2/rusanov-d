# Используем базовый образ Node.js v18.16.1
FROM node:18.16.1

# Установка рабочей директории внутри контейнера
WORKDIR /usr/src/app

# Копирование зависимостей и package.json
COPY package*.json ./

# Установка зависимостей
RUN rm -rf node_modules
RUN npm cache clean --force
RUN npm install

# Копирование исходного кода
COPY . .

# Открытие порта, на котором будет работать приложение
EXPOSE 3000

# Команда, которая будет запущена при старте контейнера
CMD ["npm", "start"]