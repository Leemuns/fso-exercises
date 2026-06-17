import js from '@eslint/js'
import globals from 'globals'
import pluginReact from 'eslint-plugin-react'
import { defineConfig } from 'eslint/config'
import vitest from '@vitest/eslint-plugin'

export default defineConfig([
  { ignores: ['dist'] },
  js.configs.recommended,
  pluginReact.configs.flat.recommended,
  {
    files: ['**/*.{js,mjs,cjs,jsx}'],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      js,
    },
    extends: ['js/recommended'],
    rules: {
      eqeqeq: 'error',
      'no-trailing-spaces': 'error',
      'object-curly-spacing': ['error', 'always'],
      'arrow-spacing': ['error', { before: true, after: true }],
      'no-console': 'off',
      'react/react-in-jsx-scope': 'off',
      'react/prop-types': 'off',
    },
  },
  {
    files: ['**/*.test.{js,jsx}'],
    plugins: {
      vitest,
    },
    languageOptions: {
      globals: {
        ...vitest.environments.env.globals,
      },
    },
    rules: {
      ...vitest.configs.recommended.rules,
    },
  },
  {
    ignores: ['**/dist/**'],
  },
])
