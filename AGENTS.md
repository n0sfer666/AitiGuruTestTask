# AGENTS.md - Aiti Guru Test Task

## О проекте

Административная панель управления товарами с авторизацией, списком продуктов, сортировкой, поиском и формой добавления.

**Стек**: React 18 + TypeScript 5.6 + Vite 6 + SCSS Modules + Effector

**API**: [DummyJSON](https://dummyjson.com/) (auth + products)

---

## 📦 Зависимости

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "react-router-dom": "^7.1.1",
    "effector": "^23.2.2",
    "effector-react": "^23.2.1",
    "@headlessui/react": "^2.2.0",
    "react-hook-form": "^7.54.2",
    "zod": "^3.24.1",
    "@hookform/resolvers": "^3.9.1",
    "ky": "^1.7.4",
    "react-hot-toast": "^2.4.1",
    "classnames": "^2.5.1"
  }
}
```

---

## 🏗️ Архитектура

### Принципы

- **DRY** — максимум переиспользования
- **KISS** — простота и понятность
- **SOLID** — масштабируемость
- **Security Levels** — строгая иерархия доступа
- **200 строк max** — декомпозиция больших файлов

### Структура

```
src/
├── app/                    # Приложение (высший уровень)
│   ├── App.tsx
│   ├── router.tsx
│   ├── providers.tsx
│   └── components/
│       ├── ErrorBoundary.tsx
│       └── ProtectedRoute.tsx
│
├── pages/                  # Страницы
│   ├── LoginPage/
│   ├── SignupPage/
│   ├── ProductsPage/
│   └── NotFoundPage/
│
├── modules/                # Фичи
│   ├── auth/
│   │   ├── api/           # authApi.ts, types.ts
│   │   ├── model/         # authStore.ts, authEvents.ts
│   │   └── components/    # LoginForm, SignupForm
│   └── products/
│       ├── api/           # productsApi.ts, types.ts
│       ├── hooks/         # useProducts, useSort, useSearch
│       └── components/    # ProductTable, ProductRow, SearchBar, AddProductForm
│
├── components/             # Общие UI компоненты
│   ├── ui/                # Button, Input, Checkbox, Loader, Typography, Pagination, Icon
│   └── layout/            # NavigationBar
│
└── shared/                 # Общие утилиты (низший уровень)
    ├── api/               # HTTP клиент (Ky)
    ├── styles/            # SCSS дизайн-система
    ├── types/             # Глобальные типы
    ├── hooks/             # useDebounce
    ├── utils/             # storage, jwt, cookies, errorHandler, toast
    └── constants/         # API_URL и др.
```

### Security Levels

```
app → pages → modules → components → shared
 ↓      ↓        ↓          ↓          ↓
все    все      все     все+shared   никто
```

**Правила**:

- ✅ **shared** — только shared
- ✅ **components** — components + shared
- ✅ **modules** — modules + components + shared
- ✅ **pages** — pages + modules + components + shared
- ✅ **app** — все уровни

**Запрещено**:

- ❌ modules → pages
- ❌ components → modules
- ❌ shared → components/modules/pages/app

---

## 🎨 SCSS + CSS Modules

### Структура

```scss
// src/shared/styles/main.scss
@forward "functions";
@forward "variables";
@forward "mixins";
@use "reset";
```

### Использование в компонентах

```scss
// Component.module.scss
@use "~assets" as *;

.button {
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-md;

  &--primary {
    background-color: $color-primary;
  }
}
```

```typescript
// Component.tsx
import styles from './Component.module.scss';
import cn from 'classnames';

<button className={cn(styles.button, styles.buttonPrimary)}>
```

### Типизация стилей

Стили автоматически типизируются через `typed-scss-modules`:

```bash
npm run declarestyle      # Генерация типов
npm run declarestyle:watch # Watch режим
```

Генерируются `.scss.d.ts` файлы с типами для CSS Modules.

---

## 🗂️ State Management

### Effector (глобальное состояние)

**Только для**:

- Auth token
- User data
- isAuthenticated

```typescript
// src/modules/auth/model/authStore.ts
import { createStore } from "effector";

export const $auth = createStore<AuthState>({
  token: localStorage.getItem("token"),
  user: null,
  isAuthenticated: !!localStorage.getItem("token"),
});
```

### React State (локальное)

**Для**:

- Product list
- Sorting
- Search query
- Form state (React Hook Form)
- UI state

### Персистентность

```typescript
// Remember Me логика
const storage = rememberMe ? localStorage : sessionStorage;
storage.setItem("token", token);
```

---

## 📡 API Layer

### HTTP Client

```typescript
// src/shared/api/client.ts
import ky from "ky";

export const api = ky.create({
  prefixUrl: "https://dummyjson.com",
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem("token");
        if (token) {
          request.headers.set("Authorization", `Bearer ${token}`);
        }
      },
    ],
  },
});
```

### API функции

```typescript
// src/modules/products/api/productsApi.ts
export const productsApi = {
  getAll: async (params?: { limit?: number; skip?: number }) => {
    return api.get("products", { searchParams: params }).json();
  },

  search: async (query: string) => {
    return api.get("products/search", { searchParams: { q: query } }).json();
  },
};
```

---

## 🔧 Vite Config

```typescript
// vite.config.ts
export default defineConfig({
  resolve: {
    alias: {
      "~assets": path.resolve(__dirname, "./src/shared/styles"),
      "@app": path.resolve(__dirname, "./src/app"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@modules": path.resolve(__dirname, "./src/modules"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@shared": path.resolve(__dirname, "./src/shared"),
    },
  },
  css: {
    modules: {
      localsConvention: "camelCase",
      generateScopedName: "[name]__[local]__[hash:base64:5]",
    },
  },
});
```

---

## 📝 Code Quality

### Файлы

- **Максимум 200 строк**
- Декомпозиция на подкомпоненты/хуки/утилиты
- Исключение: types.ts

### TypeScript

- **Strict mode** включен
- **No `any`** без крайней необходимости
- **Explicit return types** для публичных функций

### Компоненты

```typescript
import type { FC } from 'react';
import styles from './Component.module.scss';

interface ComponentNameProps {
  // Props
}

export const ComponentName: FC<ComponentNameProps> = (props) => {
  // 1. Hooks
  // 2. Derived state
  // 3. Handlers
  // 4. Render
  return <div>...</div>;
};
```

### Naming

- **Components**: PascalCase (`ProductTable.tsx`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Constants**: SCREAMING_SNAKE_CASE
- **CSS Modules**: `ComponentName.module.scss`
- **CSS Classes**: camelCase в коде (через localsConvention)

---

## 🚀 Команды

```bash
# Dev сервер + генерация типов SCSS
npm run dev

# Сборка
npm run build

# Типизация
npm run type-check

# Линтинг
npm run lint
npm run lint:css

# Генерация типов SCSS
npm run declarestyle
npm run declarestyle:watch
```

---

## 🎯 Важные замечания

1. **Pixel-perfect** — строго следовать дизайну
2. **Remember Me** — localStorage если checked, иначе sessionStorage
3. **Rating < 3** — выделять красным
4. **Add Product** — только форма, API save не нужен
5. **Sorting** — сохранять состояние
6. **Search** — API endpoint `/products/search`

---

## 🔗 Ссылки

- [DummyJSON Docs](https://dummyjson.com/docs)
- [React Docs](https://react.dev/)
- [Effector Docs](https://effector.dev/)
- [Vite Docs](https://vitejs.dev/)
