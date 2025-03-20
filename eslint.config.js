import js from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsparser from '@typescript-eslint/parser';
import prettier from 'eslint-plugin-prettier';
import importPlugin from 'eslint-plugin-import';
import unicorn from 'eslint-plugin-unicorn';
import jsdoc from 'eslint-plugin-jsdoc';

/** @type {import("eslint").FlatConfig[]} */
export default [
  unicorn.configs.recommended,
  {
    files: ['**/*.{js,mjs,cjs,ts}'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      parser: tsparser,
      globals: {
        window: 'readonly',
        document: 'readonly',
        navigator: 'readonly',
        location: 'readonly',
        fetch: 'readonly',
        HTMLElement: 'readonly',
        HTMLTableElement: 'readonly',
        HTMLButtonElement: 'readonly',
        HTMLInputElement: 'readonly',
        HTMLSpanElement: 'readonly',
        HTMLTableRowElement: 'readonly',
        localStorage: 'readonly',
        setTimeout: 'readonly',
        setInterval: 'readonly',
        clearTimeout: 'readonly',
        clearInterval: 'readonly',
        HTMLAudioElement: 'readonly',
        Audio: 'readonly',
        HTMLCanvasElement: 'readonly',
        Storage: 'readonly',
        console: 'readonly',
        HTMLDialogElement: 'readonly',
        HTMLTextAreaElement: 'readonly',
        DOMMatrix: 'readonly',
        requestAnimationFrame: 'readonly',
        Blob: 'readonly',
        URL: 'readonly',
      },
    },

    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      '@typescript-eslint': tseslint,
      prettier: prettier,
      import: importPlugin,
      jsdoc: jsdoc,
    },

    ignores: ['**/dist/**', '**/node_modules/**', '**/webpack.config.js'],

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      'prettier/prettier': 'error',
      'no-debugger': 'off',
      'no-console': 'off',
      'class-methods-use-this': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/consistent-type-assertions': [
        'error',
        { assertionStyle: 'never' },
      ],
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/explicit-function-return-type': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        { accessibility: 'explicit', overrides: { constructors: 'off' } },
      ],
      '@typescript-eslint/member-ordering': 'error',
      'jsdoc/require-returns-type': 'error',
      'jsdoc/require-returns': 'error',
      'jsdoc/require-param-type': 'error',
      'jsdoc/valid-types': 'error',
    },
  },
];
