// eslint.config.js
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import prettier from 'eslint-plugin-prettier'
import prettierConfig from 'eslint-config-prettier'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const compat = new FlatCompat({
  baseDirectory: __dirname,
})

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    plugins: { prettier },
    // rules: {
    //   'prettier/prettier': ['error'], // Báo lỗi nếu code không tuân theo Prettier
    // },
  },
  prettierConfig, // Tắt các quy tắc ESLint xung đột với Prettier
  {
    rules: {
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      "react-hooks/exhaustive-deps": 'off',
      'prefer-const': 'off',
      'jsx-a11y/alt-text': 'off',
      'next/next/no-img-element': 'on',

    },
  },
]

export default eslintConfig
