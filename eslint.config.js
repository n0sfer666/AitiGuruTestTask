import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import unusedImports from "eslint-plugin-unused-imports";
import importPlugin from "eslint-plugin-import";
import { defineConfig, globalIgnores } from "eslint/config";

export default defineConfig([
  globalIgnores(["dist", "node_modules", "**/*.d.ts", "**/*.scss.d.ts"]),
  {
    files: ["**/*.{ts,tsx}"],
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      stylistic.configs.recommended,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      perfectionist,
      "unused-imports": unusedImports,
      import: importPlugin,
      "@stylistic": stylistic,
    },
    settings: {
      "import/resolver": {
        typescript: {
          alwaysTryTypes: true,
          project: "./tsconfig.json",
        },
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // TypeScript - Unused vars with _ prefix ignore
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
        },
      ],
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
      // Allow separate type imports (needed for React FC + hooks pattern)
      "no-duplicate-imports": "off",
      "import/no-duplicates": "off",

      // Stylistic - Indentation and formatting
      "@stylistic/indent": ["error", 2],
      "@stylistic/indent-binary-ops": ["error", 2],
      "@stylistic/quotes": ["error", "double"],
      "@stylistic/semi": ["error", "always"],
      "@stylistic/comma-dangle": ["error", "always-multiline"],
      "@stylistic/no-trailing-spaces": "error",
      "@stylistic/eol-last": ["error", "always"],
      "@stylistic/no-multiple-empty-lines": ["error", { max: 1, maxEOF: 0 }],
      "@stylistic/max-len": [
        "error",
        {
          code: 100,
          ignoreUrls: true,
          ignoreStrings: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
        },
      ],
      "@stylistic/arrow-parens": ["error", "always"],
      "@stylistic/arrow-spacing": "error",
      "@stylistic/block-spacing": "error",
      "@stylistic/brace-style": ["error", "1tbs", { allowSingleLine: false }],
      "@stylistic/comma-spacing": ["error", { before: false, after: true }],
      "@stylistic/comma-style": ["error", "last"],
      "@stylistic/computed-property-spacing": ["error", "never"],
      "@stylistic/dot-location": ["error", "property"],
      "@stylistic/function-call-spacing": ["error", "never"],
      "@stylistic/function-paren-newline": ["error", "consistent"],
      "@stylistic/generator-star-spacing": [
        "error",
        { before: true, after: false },
      ],
      "@stylistic/key-spacing": [
        "error",
        { beforeColon: false, afterColon: true },
      ],
      "@stylistic/keyword-spacing": ["error", { before: true, after: true }],
      "@stylistic/lines-between-class-members": [
        "error",
        "always",
        { exceptAfterSingleLine: true },
      ],
      "@stylistic/member-delimiter-style": [
        "error",
        {
          multiline: { delimiter: "semi", requireLast: true },
          singleline: { delimiter: "semi", requireLast: false },
        },
      ],
      "@stylistic/new-parens": "error",
      "@stylistic/no-floating-decimal": "error",
      "@stylistic/no-mixed-operators": "error",
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multi-spaces": "error",
      "@stylistic/no-tabs": "error",
      "@stylistic/no-whitespace-before-property": "error",
      "@stylistic/object-curly-newline": [
        "error",
        { multiline: true, consistent: true },
      ],
      "@stylistic/object-curly-spacing": ["error", "always"],
      "@stylistic/object-property-newline": [
        "error",
        { allowAllPropertiesOnSameLine: true },
      ],
      "@stylistic/operator-linebreak": ["error", "after"],
      "@stylistic/padded-blocks": ["error", "never"],
      "@stylistic/quote-props": ["error", "as-needed"],
      "@stylistic/rest-spread-spacing": ["error", "never"],
      "@stylistic/semi-spacing": ["error", { before: false, after: true }],
      "@stylistic/semi-style": ["error", "last"],
      "@stylistic/space-before-blocks": "error",
      "@stylistic/space-before-function-paren": [
        "error",
        { anonymous: "always", named: "never", asyncArrow: "always" },
      ],
      "@stylistic/space-in-parens": ["error", "never"],
      "@stylistic/space-infix-ops": "error",
      "@stylistic/space-unary-ops": ["error", { words: true, nonwords: false }],
      "@stylistic/spaced-comment": ["error", "always", { markers: ["/"] }],
      "@stylistic/switch-colon-spacing": "error",
      "@stylistic/template-curly-spacing": ["error", "never"],
      "@stylistic/template-tag-spacing": ["error", "never"],
      // Note: type-annotation-spacing disabled due to conflicts with arrow functions
      "@stylistic/type-annotation-spacing": "off",
      "@stylistic/type-generic-spacing": "error",
      "@stylistic/type-named-tuple-spacing": "error",
      "@stylistic/wrap-iife": ["error", "inside"],
      "@stylistic/yield-star-spacing": [
        "error",
        { before: true, after: false },
      ],

      // JSX Formatting
      "@stylistic/jsx-newline": ["error", { prevent: false }],

      // Perfectionist - Sorting
      "perfectionist/sort-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
          ignoreCase: true,
          newlinesBetween: 1,
        },
      ],
      "perfectionist/sort-exports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "perfectionist/sort-named-imports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "perfectionist/sort-named-exports": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "perfectionist/sort-interfaces": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "perfectionist/sort-object-types": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],
      "perfectionist/sort-union-types": [
        "error",
        {
          type: "alphabetical",
          order: "asc",
        },
      ],

      // Import plugin
      "import/no-duplicates": "off",
      "import/first": "error",
      "import/newline-after-import": ["error", { count: 1 }],
      "import/no-cycle": "error",
      "import/no-self-import": "error",

      // React Hooks
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",

      // React Refresh
      "react-refresh/only-export-components": [
        "warn",
        { allowConstantExport: true },
      ],

      // General best practices
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "no-debugger": "error",
      "no-alert": "error",
      "no-var": "error",
      "prefer-const": "error",
      "prefer-arrow-callback": "error",
      "prefer-template": "error",
      "object-shorthand": "error",
      eqeqeq: ["error", "always", { null: "ignore" }],
      curly: ["error", "all"],
      "no-throw-literal": "error",
      "no-return-await": "error",
      "require-await": "error",
      "no-useless-return": "error",
      "no-useless-concat": "error",
      "no-useless-escape": "error",
      "no-useless-computed-key": "error",
      "no-useless-rename": "error",
      "no-useless-constructor": "error",
      "no-useless-catch": "error",
      "no-duplicate-imports": "off",
    },
  },
]);
