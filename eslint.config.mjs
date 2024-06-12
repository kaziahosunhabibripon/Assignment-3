import globals from "globals";
import pluginJs from "@eslint/js";
import tseslint from "typescript-eslint";
import node from "eslint-plugin-node";
import tsPlugin from "@typescript-eslint/eslint-plugin";

export default [
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  {
    languageOptions: {
      globals: {
        ...globals.node,
      },
    },
  },

  {
    plugins: {
      node,
      "@typescript-eslint": tsPlugin,
    },
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      "prefer-const": "error",
      "no-console": "warn",
    },
  },
  {
    ignores: ["**/node_modules/", "**/dist"],
  },
];
