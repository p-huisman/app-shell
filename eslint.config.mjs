import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier";
// console.log(tseslint.configs.recommended);
export default [
  {files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"]},
  {
    settings: {
      react: {
        version: "detect"
      }
    }
  },
  {languageOptions: { globals: globals.browser }},
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  eslintConfigPrettier,
  {
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
    }
  },
  {
    ignores: ['node_modules', 'dist']
  },
];