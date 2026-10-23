# React + TypeScript + Vite

## Arquitectura de la aplicación

La interfaz está organizada por responsabilidad para facilitar la sustitución de los datos locales por una API:

```text
src/
├── components/
│   ├── common/             # Modales compartidos
│   └── organigrama/        # Árbol visual del organigrama
├── data/                   # Datos de demostración
├── hooks/                  # Estado, navegación y casos de uso de interfaz
├── pages/                  # Organigrama, áreas, detalle y panel administrativo
├── services/               # Adaptadores de dominio mock, reemplazables por HTTP
├── types/                  # Modelos de dominio y tipos de navegación
├── App.tsx                 # Composición raíz
├── main.tsx                # Bootstrap React
└── index.css               # Tailwind CSS
```

`useOrganigramaState` coordina el estado de la UI y llama a servicios tipados. Los servicios actuales son locales y no realizan llamadas de red; al integrar NestJS, se pueden reemplazar sus implementaciones por clientes REST y mapear las respuestas a los tipos de dominio. `auth.service.ts` conserva la autenticación de demostración existente y no debe considerarse autenticación segura ni JWT real.

La configuración de TypeScript de la aplicación activa `strict` para detectar incompatibilidades de tipos antes de integrar contratos remotos.

Las vistas actuales no tienen rutas independientes: el componente principal conserva la navegación interna que ya existía y compone las vistas disponibles. No se agregaron pantallas nuevas.

## Comandos

- `npm run dev`: servidor de desarrollo Vite.
- `npm run build`: verificación TypeScript y build de producción.
- `npm run lint`: ESLint.

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```

You can also install [eslint-plugin-react-x](https://npmx.dev/package/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://npmx.dev/package/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])

```
