import js from "@eslint/js";
import tseslint from "@typescript-eslint/eslint-plugin";
import tsparser from "@typescript-eslint/parser";
import prettier from "eslint-plugin-prettier";
import importPlugin from "eslint-plugin-import";
//import unicorn from "eslint-plugin-unicorn";

/** @type {import("eslint").FlatConfig[]} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts}"],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: "module",
      parser: tsparser,
    },

    linterOptions: {
      noInlineConfig: true,
      reportUnusedDisableDirectives: true,
    },

    plugins: {
      "@typescript-eslint": tseslint,
      prettier: prettier,
      import: importPlugin,
      //unicorn: unicorn,
    },

    /*extends: [
      "plugin:unicorn/recommended",
    ],*/

    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      "prettier/prettier": "error",
      "no-debugger": "off",
      "no-console": "off",
      "class-methods-use-this": "off",
      "@typescript-eslint/no-explicit-any": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        { "assertionStyle": "never" }
      ],
      "@typescript-eslint/consistent-type-imports": "error",
      "@typescript-eslint/explicit-function-return-type": "error",
      "@typescript-eslint/explicit-member-accessibility": [
        "error",
        { "accessibility": "explicit", "overrides": { "constructors": "off" } }
      ],
      "@typescript-eslint/member-ordering": "error"
    },
  },
];