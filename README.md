# AitiGuru Test Task

Административная панель управления товарами с авторизацией, поиском и сортировкой.

## Технологии

**Core:** React 18 + TypeScript 5.6 + Vite 6  
**State:** Effector  
**HTTP:** Ky  
**Forms:** React Hook Form + Zod  
**UI:** Headless UI  
**Styling:** SCSS

## Быстрый старт

```bash
# Установка зависимостей
npm install

# Запуск dev-сервера
npm run dev

# Сборка
npm run build

# Проверка типов
npm run type-check

# Линтинг
npm run lint
```

## Архитектура

```
src/
├── app/           # Роутинг, провайдеры
├── pages/         # Страницы (LoginPage, ProductsPage)
├── modules/       # Фичи (auth, products)
├── components/    # UI-компоненты
└── shared/        # API, стили, утилиты
```

**Принципы:** DRY, KISS, SOLID. Максимум 200 строк на файл.

## API

[DummyJSON](https://dummyjson.com/) — авторизация и данные о товарах.
