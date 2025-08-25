# 🚀 Веб-сервис для приема вебхуков

Этот проект представляет собой веб-сервис, написанный на TypeScript, который принимает входящие HTTP вебхуки от внешних систем и сохраняет полученные данные в базу данных PostgreSQL.

## 🛠 Технологии

- **Язык программирования:** TypeScript
- **Веб-фреймворк:** Express.js
- **База данных:** PostgreSQL
- **ORM:** Prisma
- **Контейнеризация:** Docker (мультиконтейнерная архитектура)

## 📋 Требования

- Node.js (версия 20 или выше)
- Docker и Docker Compose
- npm или yarn

## 🚀 Запуск сервиса

### 1. Клонирование репозитория
```bash
git clone <repository-url>
cd webhook-service
```

### 2. Установка зависимостей
```bash
npm install
```

### 3. Запуск в Docker

#### Первый запуск (с созданием миграций)
```bash
# Запуск контейнеров
docker-compose up --build -d

# Создание и применение миграций
docker-compose exec webhook-service npx prisma migrate dev --name init
```

#### Последующие запуски
```bash
# Запуск контейнеров
docker-compose up -d

# Применение существующих миграций
docker-compose exec webhook-service npx prisma migrate deploy
```

### 4. Проверка работоспособности
```bash
# Проверка статуса контейнеров
docker-compose ps

# Проверка логов
docker-compose logs -f

# Проверка структуры базы данных
docker-compose exec postgres psql -U postgres -d webhook_db -c "\d webhook_events"
```

Сервис будет доступен по адресу: `http://localhost:3000`

## 📝 Как это работает

### Архитектура

Сервис построен по принципам чистой архитектуры и состоит из следующих компонентов:

1. **Контроллеры** (`/src/controllers`)
   - Обрабатывают HTTP-запросы
   - Валидируют входящие данные
   - Возвращают HTTP-ответы

2. **Сервисы** (`/src/services`)
   - Содержат бизнес-логику
   - Обрабатывают данные
   - Взаимодействуют с репозиториями

3. **Репозитории** (`/src/repositories`)
   - Работают с базой данных
   - Выполняют CRUD-операции
   - Используют Prisma ORM

4. **Модели** (`/src/types`)
   - Определяют типы данных
   - Содержат схемы валидации
   - Описывают структуру вебхуков

### Поток данных

1. Внешняя система отправляет POST-запрос на `/webhook`
2. Контроллер валидирует запрос и данные
3. Сервис обрабатывает данные и сохраняет их в базу
4. База данных хранит информацию о вебхуках
5. Сервис возвращает ответ внешней системе

### Пример запроса

```bash
curl -X POST http://localhost:3000/webhook \
  -H "Content-Type: application/json" \
  -H "X-External-System: TestSystem" \
  -d '{
    "id": 6553,
    "status": "completed",
    "clientId": "unit2",
    "requestorId": "Darck_Crystal",
    "amount": "12",
    "currency": "USDT",
    "payway": "trc20",
    "direction": "payin"
  }'
```

### Ответ сервиса

```json
{
  "status": "ok",
  "receivedAt": "2024-04-10T13:00:00Z"
}
```

## 🗄 Структура базы данных

Таблица `webhook_events` содержит следующие поля:
- `id` (UUID) - уникальный идентификатор
- `headers` (TEXT) - заголовки запроса
- `payload` (TEXT) - тело запроса
- `status` (STRING) - статус обработки
- `received_at` (TIMESTAMP) - время получения

## 🔧 Настройка окружения

Сервис использует следующие переменные окружения:

### Веб-сервис
- `PORT` - порт для запуска сервиса (по умолчанию 3000)
- `DATABASE_URL` - URL для подключения к PostgreSQL
- `NODE_ENV` - окружение (development/production)

### База данных PostgreSQL
- `POSTGRES_USER` - пользователь базы данных
- `POSTGRES_PASSWORD` - пароль пользователя
- `POSTGRES_DB` - название базы данных

## 📊 Мониторинг и логирование

Сервис использует Winston для логирования:
- Логи сохраняются в консоль
- Записываются все важные события
- Отслеживаются ошибки

## 🔒 Безопасность

- Валидация входящих данных
- Обработка ошибок
- Логирование событий
- HTTP-статусы для разных ситуаций
- Изолированные контейнеры для сервиса и базы данных
- Защищенные учетные данные базы данных

## 🐛 Отладка

Для отладки можно использовать:
```bash
# Запуск в режиме разработки
npm run dev

# Просмотр логов веб-сервиса
docker-compose logs -f webhook-service

# Просмотр логов базы данных
docker-compose logs -f postgres

# Подключение к базе данных
docker-compose exec postgres psql -U postgres -d webhook_db

# Проверка миграций
docker-compose exec webhook-service npx prisma migrate status

# Создание новой миграции
docker-compose exec webhook-service npx prisma migrate dev --name <migration_name>
```

## 📚 Дополнительная информация

- [Prisma Documentation](https://www.prisma.io/docs/)
- [Express.js Documentation](https://expressjs.com/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/) 