import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import typescriptEslint from '@typescript-eslint/eslint-plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  // La règle `any` est appliquée dans le même objet que le plugin qui la fournit
  // (celui-ci vient de eslint-config-next).
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: { '@typescript-eslint': typescriptEslint },
    rules: {
      // Le `any` est interdit : sans ce verrou, la dette revient à chaque PR.
      '@typescript-eslint/no-explicit-any': 'error',
      'react/no-unescaped-entities': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      '@next/next/no-img-element': 'off',
    },
  },
  {
    ignores: [
      'node_modules/**',
      '.next/**',
      'out/**',
      'build/**',
      'next-env.d.ts',
      '.kilo/**',
      'coverage/**',
    ],
  },
];

export default eslintConfig;
