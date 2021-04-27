module.exports = {
  parser: '@typescript-eslint/parser',
  // env: {
  //   node: true,
  // },
  extends: [
    // 'airbnb-base',

    // Uses the recommended rules from the @typescript-eslint/eslint-plugin
    'plugin:@typescript-eslint/recommended',

    // Uses eslint-config-prettier to disable ESLint rules from
    // @typescript-eslint/eslint-plugin that would conflict with prettier
    'prettier/@typescript-eslint',

    // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors.
    // Runs prettier as an ESLint rule
    // Make sure this is always the last configuration in the extends array.
    'plugin:prettier/recommended',

    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: 'module', // Allows for the use of imports
  },
  root: true,
  rules: {
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/interface-name-prefix': 'off',
    'import/order': [
      'error',
      {
        'groups': [
          'builtin',
          'external',
          'internal'
        ],
        "newlines-between": "always"
      }
    ]
  },
  overrides: [
    {
      files: ['scripts/*'],
      rules: {
        '@typescript-eslint/no-var-requires': 'off',
      },
    },
  ]
};
