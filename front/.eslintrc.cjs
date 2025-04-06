module.exports = {
  extends: ['next/core-web-vitals', 'plugin:prettier/recommended', 'plugin:import/recommended'],
  plugins: ['import'],
  rules: {
    'prettier/prettier': 'warn',
    'import/named': 'off',
    'import/order': [
      'warn',
      {
        groups: ['builtin', ['external', 'internal'], ['sibling', 'parent', 'index'], 'type', 'unknown'],
        pathGroups: [
          {
            pattern: 'react',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'react/*',
            group: 'builtin',
            position: 'before',
          },
          {
            pattern: 'next',
            group: 'builtin',
          },
          {
            pattern: 'next/*',
            group: 'builtin',
          },
          {
            pattern: '@ad-fe/**',
            group: 'internal',
          },
          {
            pattern: '@/**',
            group: 'internal',
            position: 'after',
          },
        ],
        pathGroupsExcludedImportTypes: ['react', 'react*'],
        'newlines-between': 'always',
        alphabetize: {
          order: 'asc',
          caseInsensitive: true,
        },
      },
    ],
  },
}
