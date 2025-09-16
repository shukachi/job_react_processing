# Stage 1: Сборка React-приложения
FROM node:18-alpine as build

WORKDIR /app

# Копируем package.json и устанавливаем зависимости
COPY package.json ./
# Если у вас есть package-lock.json, раскомментируйте следующую строку
# COPY package-lock.json ./
RUN npm install

# Копируем исходный код
COPY . .

# Собираем production-билд
RUN npm run build

# Stage 2: Раздача статики через Nginx
FROM nginx:stable-alpine

# Копируем кастомную конфигурацию Nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Копируем собранные файлы из стадии 'build'
COPY --from=build /app/build /usr/share/nginx/html

# Открываем порт 80
EXPOSE 80

# Запускаем Nginx
CMD ["nginx", "-g", "daemon off;"]

