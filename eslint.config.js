import globals from 'globals';
import js from '@eslint/js';
import path from 'node:path';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import tsParser from '@typescript-eslint/parser';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import { fileURLToPath } from 'node:url';
import { FlatCompat } from '@eslint/eslintrc';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  allConfig: js.configs.all,
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended
});

export default [
  ...compat
    .extends(
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:react-hooks/recommended',
      'plugin:@typescript-eslint/recommended',
      'prettier'
    )
    .map(config => ({
      ...config,
      files: ['app/**/*.ts', 'app/**/*.tsx']
    })),
  {
    files: ['app/**/*.ts', 'app/**/*.tsx'],
    plugins: {
      react,
      'react-hooks': reactHooks,
      '@typescript-eslint': typescriptEslint
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node
      },
      parser: tsParser,
      ecmaVersion: 12,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        }
      }
    },
    settings: {
      react: {
        version: 'detect'
      }
    },
    rules: {
      camelcase: 2,
      'eol-last': ['error', 'always'],
      'no-console': [
        'error',
        {
          allow: ['error', 'info', 'warn']
        }
      ],
      'no-duplicate-case': 'error',
      'no-dupe-keys': 'error',
      'no-empty': 'error',
      'no-empty-pattern': 'off',
      'no-irregular-whitespace': [
        'error',
        {
          skipComments: true,
          skipJSXText: true,
          skipRegExps: true,
          skipStrings: true,
          skipTemplates: true
        }
      ],
      'no-mixed-operators': 'off',
      'no-nested-ternary': 'off',
      'no-var': 'error',
      'no-plusplus': 'off',
      'no-trailing-spaces': ['error', { ignoreComments: true }],
      'no-unused-vars': ['error', { argsIgnorePattern: '^_' }],
      'object-curly-spacing': ['error', 'always'],
      'padding-line-between-statements': [
        'error',
        {
          blankLine: 'always',
          prev: '*',
          next: [
            'break',
            'class',
            'const',
            'cjs-export',
            'debugger',
            'do',
            'export',
            'for',
            'function',
            'if',
            'let',
            'multiline-const',
            'multiline-let',
            'return',
            'switch',
            'throw',
            'try',
            'while'
          ]
        },
        {
          blankLine: 'always',
          prev: [
            'class',
            'const',
            'debugger',
            'do',
            'default',
            'export',
            'for',
            'function',
            'if',
            'let',
            'multiline-const',
            'multiline-let',
            'return',
            'switch',
            'try',
            'while'
          ],
          next: '*'
        },
        {
          blankLine: 'never',
          prev: ['singleline-const', 'singleline-let'],
          next: ['singleline-const', 'singleline-let']
        },
        {
          blankLine: 'always',
          prev: ['directive', 'cjs-import'],
          next: '*'
        },
        {
          blankLine: 'always',
          prev: '*',
          next: ['directive', 'cjs-import']
        },
        {
          blankLine: 'never',
          prev: ['cjs-import'],
          next: ['cjs-import']
        },
        {
          blankLine: 'never',
          prev: ['directive'],
          next: ['directive']
        }
      ],
      'prefer-const': 'error',
      'react/jsx-no-undef': 'error',
      'react/jsx-sort-props': [
        'error',
        {
          callbacksLast: true,
          ignoreCase: true,
          reservedFirst: true,
          shorthandFirst: true
        }
      ],
      'react/no-unused-state': 'error',
      'react/react-in-jsx-scope': 'off',
      'spaced-comment': [
        'error',
        'always',
        {
          line: {
            markers: ['/'],
            exceptions: ['-', '+']
          },
          block: {
            markers: ['!'],
            exceptions: ['*'],
            balanced: true
          }
        }
      ],
      '@typescript-eslint/no-explicit-any': 'off'
    }
  }
];
