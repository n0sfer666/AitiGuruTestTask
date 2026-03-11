# AGENTS.md - Aiti Guru Test Task

## 🇷🇺 О проекте

Административная панель управления товарами с авторизацией, списком продуктов, сортировкой, поиском и формой добавления.

**Стек**: React 18 + TypeScript 5.6+ + Vite 6 + SCSS + Effector

**API**: [DummyJSON](https://dummyjson.com/) (auth + products)

**Дизайн**: Figma mockup (pixel-perfect implementation)

---

## 📦 Основные зависимости

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
    "react-hot-toast": "^2.4.1"
  },
  "devDependencies": {
    "@types/react": "^18.3.18",
    "@types/react-dom": "^18.3.5",
    "typescript": "^5.6.3",
    "vite": "^6.0.7",
    "@vitejs/plugin-react": "^4.3.4",
    "sass": "^1.83.4",
    "eslint": "^9.17.0",
    "prettier": "^3.4.2"
  }
}
```

---

## 🏗️ Архитектура

### Принципы

- **DRY** (Don't Repeat Yourself) - максимум переиспользования
- **KISS** (Keep It Simple, Stupid) - простота и понятность
- **SOLID** - 5 принципов ООП для масштабируемости
- **Security Levels** - строгая иерархия доступа между слоями
- **200 lines max** - файлы больше 200 строк требуют декомпозиции

### Структура проекта

```
src/
├── app/                    # Приложение (высший уровень)
│   ├── App.tsx            # Корневой компонент
│   ├── router.tsx         # Роутинг
│   └── providers.tsx      # Провайдеры (Effector, Toast)
│
├── pages/                  # Страницы
│   ├── LoginPage/         # Страница авторизации
│   │   ├── LoginPage.tsx
│   │   ├── LoginPage.scss
│   │   └── types.ts
│   └── ProductsPage/      # Страница товаров
│       ├── ProductsPage.tsx
│       ├── ProductsPage.scss
│       └── types.ts
│
├── modules/                # Модули (фичи)
│   ├── auth/              # Авторизация
│   │   ├── model/         # Effector stores, events
│   │   ├── api/           # API функции
│   │   └── types.ts
│   └── products/          # Товары
│       ├── components/    # Компоненты модуля
│       │   ├── ProductTable/
│       │   ├── AddProductForm/
│       │   └── SearchBar/
│       ├── hooks/         # Кастомные хуки
│       ├── api/           # API функции
│       └── types.ts
│
├── components/             # Общие UI компоненты
│   ├── ui/                # Примитивы
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Checkbox/
│   │   └── Loader/
│   └── layout/            # Лейаут компоненты
│       ├── Header/
│       └── Container/
│
└── shared/                 # Общие утилиты (низший уровень)
    ├── api/               # HTTP клиент (Ky)
    │   ├── client.ts      # Настройка Ky
    │   └── types.ts
    ├── styles/            # SCSS дизайн-система
    │   ├── _variables.scss
    │   ├── _mixins.scss
    │   ├── _functions.scss
    │   ├── _reset.scss
    │   └── main.scss
    ├── types/             # Глобальные типы
    ├── utils/             # Хелперы
    └── constants/         # Константы
```

### Security Levels (уровни доступа)

```
app → pages → modules → components → shared
 ↓      ↓        ↓          ↓          ↓
все    все      все     все+shared   никто
```

**Правила**:
- ✅ **shared** может использовать только shared
- ✅ **components** может использовать components + shared
- ✅ **modules** может использовать modules + components + shared
- ✅ **pages** может использовать pages + modules + components + shared
- ✅ **app** может использовать все уровни

**Запрещено**:
- ❌ modules → pages (низший уровень не может импортировать высший)
- ❌ components → modules
- ❌ shared → components/modules/pages/app

---

## 🎨 SCSS Дизайн-система

### Структура файлов

```scss
// src/shared/styles/main.scss
// Forward all design tokens (variables, functions, mixins)
@forward 'functions';
@forward 'variables';
@forward 'mixins';

// Use reset to output CSS
@use 'reset';
```

### Дизайн-токены (_variables.scss)

```scss
// Цвета
$color-primary: #3b82f6;
$color-danger: #ef4444;
$color-success: #22c55e;
$color-warning: #f59e0b;
$color-text-primary: #1f2937;
$color-text-secondary: #6b7280;
$color-background: #ffffff;
$color-border: #e5e7eb;

// Типографика
$font-family: 'Inter', -apple-system, sans-serif;
$font-size-xs: 0.75rem;   // 12px
$font-size-sm: 0.875rem;  // 14px
$font-size-base: 1rem;    // 16px
$font-size-lg: 1.125rem;  // 18px
$font-size-xl: 1.25rem;   // 20px

// Отступы
$spacing-xs: 0.25rem;  // 4px
$spacing-sm: 0.5rem;   // 8px
$spacing-md: 1rem;     // 16px
$spacing-lg: 1.5rem;   // 24px
$spacing-xl: 2rem;     // 32px

// Радиусы
$border-radius-sm: 0.25rem;  // 4px
$border-radius-md: 0.5rem;   // 8px
$border-radius-lg: 1rem;     // 16px

// Тени
$shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
$shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
$shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.15);

// Breakpoints
$breakpoint-sm: 640px;
$breakpoint-md: 768px;
$breakpoint-lg: 1024px;
$breakpoint-xl: 1280px;
```

### Миксины (_mixins.scss)

```scss
// Responsive
@mixin respond-to($breakpoint) {
  @if $breakpoint == sm {
    @media (min-width: $breakpoint-sm) { @content; }
  } @else if $breakpoint == md {
    @media (min-width: $breakpoint-md) { @content; }
  } @else if $breakpoint == lg {
    @media (min-width: $breakpoint-lg) { @content; }
  } @else if $breakpoint == xl {
    @media (min-width: $breakpoint-xl) { @content; }
  }
}

// Flexbox
@mixin flex-center {
  display: flex;
  align-items: center;
  justify-content: center;
}

@mixin flex-between {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

// Truncate text
@mixin truncate($lines: 1) {
  @if $lines == 1 {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  } @else {
    display: -webkit-box;
    -webkit-line-clamp: $lines;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
}
```

### Функции (_functions.scss)

```scss
// Конвертация px в rem
@function px-to-rem($px, $base: 16) {
  @return calc($px / $base) * 1rem;
}

// Получение цвета из палитры с вариацией
@function color($color, $variant: 'base') {
  @return map-get(map-get($colors, $color), $variant);
}
```

### Использование

```scss
// components/ui/Button/Button.scss
@use '~assets' as *;

.button {
  padding: $spacing-sm $spacing-md;
  border-radius: $border-radius-md;
  font-size: $font-size-sm;
  font-weight: 600;
  transition: all 0.2s ease;

  &--primary {
    background-color: $color-primary;
    color: white;

    &:hover {
      background-color: darken($color-primary, 10%);
    }
  }

  @include respond-to(md) {
    padding: $spacing-md $spacing-lg;
  }
}
```

---

## 🗂️ State Management

### Effector (глобальное состояние)

**Используется ТОЛЬКО для**:
- ✅ Auth token
- ✅ User data
- ✅ isAuthenticated

**Структура**:
```
src/modules/auth/model/
├── authStore.ts    # Effector store
├── authEvents.ts   # Events (login, logout)
└── authEffects.ts  # API effects
```

**Пример**:
```typescript
// src/modules/auth/model/authStore.ts
import { createStore } from 'effector';

interface AuthState {
  token: string | null;
  user: User | null;
  isAuthenticated: boolean;
}

export const $auth = createStore<AuthState>({
  token: localStorage.getItem('token'),
  user: null,
  isAuthenticated: !!localStorage.getItem('token'),
});
```

### React State (локальное состояние)

**Используется для**:
- ✅ Product list (products, loading, error)
- ✅ Sorting (sortField, sortOrder)
- ✅ Search query
- ✅ Form state (React Hook Form)
- ✅ UI state (modals, dropdowns)

**Пример**:
```typescript
// src/modules/products/hooks/useProducts.ts
import { useState, useEffect } from 'react';

export const useProducts = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState<SortConfig>({ field: 'id', order: 'asc' });

  // Logic...

  return { products, loading, sort, setSort };
};
```

### LocalStorage (персистентность)

**Remember Me логика**:
```typescript
// Если checked → сохраняем в localStorage
// Если !checked → сохраняем в sessionStorage
const storage = rememberMe ? localStorage : sessionStorage;
storage.setItem('token', token);
```

---

## 📡 API Layer

### HTTP Client (Ky)

```typescript
// src/shared/api/client.ts
import ky from 'ky';

export const api = ky.create({
  prefixUrl: 'https://dummyjson.com',
  hooks: {
    beforeRequest: [
      (request) => {
        const token = localStorage.getItem('token');
        if (token) {
          request.headers.set('Authorization', `Bearer ${token}`);
        }
      },
    ],
    afterResponse: [
      (_request, _options, response) => {
        // Handle 401, errors, etc.
      },
    ],
  },
});
```

### API Functions

```typescript
// src/modules/auth/api/authApi.ts
import { api } from '@shared/api/client';
import type { LoginRequest, LoginResponse } from '../types';

export const authApi = {
  login: async (credentials: LoginRequest): Promise<LoginResponse> => {
    return api.post('auth/login', { json: credentials }).json();
  },
};

// src/modules/products/api/productsApi.ts
import { api } from '@shared/api/client';
import type { Product, ProductsResponse } from '../types';

export const productsApi = {
  getAll: async (params?: { limit?: number; skip?: number }): Promise<ProductsResponse> => {
    return api.get('products', { searchParams: params }).json();
  },

  search: async (query: string): Promise<ProductsResponse> => {
    return api.get('products/search', { searchParams: { q: query } }).json();
  },
};
```

---

## 🔧 Vite Configuration

### Aliases

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '~assets': path.resolve(__dirname, './src/shared/styles/main.scss'),
      '@app': path.resolve(__dirname, './src/app'),
      '@pages': path.resolve(__dirname, './src/pages'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@components': path.resolve(__dirname, './src/components'),
      '@shared': path.resolve(__dirname, './src/shared'),
    },
  },
});
```

### tsconfig.json

```json
{
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@app/*": ["src/app/*"],
      "@pages/*": ["src/pages/*"],
      "@modules/*": ["src/modules/*"],
      "@components/*": ["src/components/*"],
      "@shared/*": ["src/shared/*"]
    },
    "strict": true,
    // ... other options
  }
}
```

---

## 📝 Code Quality Rules

### File Size

- **Максимум 200 строк** на файл
- Если больше → декомпозиция на подкомпоненты/хуки/утилиты
- Исключение: типы (types.ts могут быть больше)

### TypeScript

- **Strict mode** включен
- **No `any`** без крайней необходимости
- **Explicit return types** для публичных функций
- **Interface over type** для объектов
- **Type guards** для runtime проверки

### Component Structure

```typescript
// Standard component structure
import type { FC } from 'react';
import './ComponentName.scss';

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

### Naming Conventions

- **Components**: PascalCase (`ProductTable.tsx`)
- **Utilities**: camelCase (`formatPrice.ts`)
- **Constants**: SCREAMING_SNAKE_CASE (`API_BASE_URL`)
- **CSS Classes**: BEM (`block__element--modifier`)
- **Files**: Same as exported entity

### SCSS Rules

- Использовать `@use '~assets' as *;` для импорта дизайн-токенов (не `@import`)
- Использовать дизайн-токены из `_variables.scss`
- Не хардкодить цвета/отступы
- BEM методология для классов
- Максимум 3 уровня вложенности
- Компонентные стили в отдельной папке компонента

---

## 🎯 Best Practices

### Performance

- ✅ `useMemo` для тяжелых вычислений
- ✅ `useCallback` для передаваемых handlers
- ✅ `React.memo` для частых ре-рендеров
- ✅ Code splitting (React.lazy для страниц)
- ✅ Debounce для поиска

### Accessibility

- ✅ Семантическая разметка
- ✅ ARIA атрибуты
- ✅ Keyboard navigation
- ✅ Focus management
- ✅ Screen reader support

### Error Handling

- ✅ Try-catch в async функциях
- ✅ Error boundaries
- ✅ Toast notifications для ошибок
- ✅ Fallback UI
- ✅ Валидация на клиенте (Zod)

### Security

- ✅ Token в httpOnly cookies (если возможно) или secure storage
- ✅ XSS protection (React default)
- ✅ Input sanitization
- ✅ HTTPS only

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Type checking
npm run type-check

# Linting
npm run lint
```

---

## 📚 Useful Commands

```bash
# Generate component
mkdir -p src/components/ui/NewComponent
touch src/components/ui/NewComponent/{NewComponent.tsx,NewComponent.scss,types.ts}

# Check bundle size
npm run build -- --mode analyze

# Update dependencies
npm update
```

---

## 🔗 Links

- [DummyJSON API Docs](https://dummyjson.com/docs)
- [React Documentation](https://react.dev/)
- [Effector Documentation](https://effector.dev/)
- [Vite Documentation](https://vitejs.dev/)
- [SCSS Documentation](https://sass-lang.com/)

---

## ⚠️ Important Notes

1. **Pixel-perfect** - строго следовать Figma дизайну
2. **Remember Me** - токен в localStorage если checked, иначе sessionStorage
3. **Rating < 3** - выделять красным цветом
4. **Add Product** - только форма, API save не нужен
5. **Sorting** - сохранять состояние сортировки
6. **Search** - использовать API endpoint `/products/search`

---

**Happy coding! 🎉**
