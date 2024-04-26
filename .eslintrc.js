module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint/eslint-plugin'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    // 'plugin:prettier/recommended',
    'plugin:boundaries/strict',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  settings: {
    "import/resolver": {
      typescript: {
        alwaysTryTypes: true,
        project: 'tsconfig.json'
      },
    },
    'boundaries/elements': [
      {
        type: 'apps/api',
        pattern: 'apps/api',
      },
      {
        type: 'apps/cache-warmer',
        pattern: 'apps/cache-warmer',
      },
      {
        type: 'apps/queue-worker',
        pattern: 'apps/queue-worker',
      },
      {
        type: 'apps/transactions-processor',
        pattern: 'apps/transactions-processor',
      },
      {
        type: 'libs/common',
        pattern: 'libs/common'
      },
      {
        type: 'libs/database',
        pattern: 'libs/database'
      },
      {
        type: 'libs/entities',
        pattern: 'libs/entities'
      },
      {
        type: 'libs/services',
        pattern: 'libs/services'
      },
    ]
  },
  rules: {
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-unused-vars": ["off"],
    "@typescript-eslint/ban-ts-comment": ["off"],
    "@typescript-eslint/no-empty-function": ["off"],
    "@typescript-eslint/ban-types": ["off"],
    "@typescript-eslint/no-var-requires": ["off"],
    "@typescript-eslint/no-inferrable-types": ["off"],
    "require-await": ["error"],
    "@typescript-eslint/no-floating-promises": ["error"],
    "max-len": ["off"],
    "semi": ["error"],
    "comma-dangle": ["error", "always-multiline"],
    "eol-last": ["error"],
    'no-restricted-imports': ['error', {
      patterns: ['libs/*', 'apps/*', '**/apps', '**/libs'],
    }],
    "boundaries/element-types": ["error", {
      default: 'disallow',
      rules: [
        {
          from: 'apps/api',
          allow: ['libs/common', 'libs/entities', 'libs/services']
        },
        {
          from: 'apps/cache-warmer',
          allow: ['libs/common', 'libs/entities', 'libs/services']
        },
        {
          from: 'apps/queue-worker',
          allow: ['libs/common', 'libs/entities', 'libs/services']
        },
        {
          from: 'apps/transactions-processor',
          allow: ['libs/common', 'libs/entities', 'libs/services']
        },
        {
          from: 'libs/database',
          allow: ['libs/common', 'libs/entities']
        },
        {
          from: 'libs/services',
          allow: ['libs/common', 'libs/entities', 'libs/database']
        },
        {
          from: 'libs/common',
          allow: ['libs/entities']
        }
      ]
    }],
    'boundaries/no-unknown': [2],
    'boundaries/no-unknown-files': [2],
    'boundaries/no-private': [0]
  },
  ignorePatterns: ['.eslintrc.js'],
  "overrides": [
    {
      "files": ["libs/common/**/*.ts"],
      "rules": {
        "no-restricted-imports": ["error", {
          "patterns": ["@libs/common*"]
        }]
      }
    },
    {
      "files": ["libs/database/**/*.ts"],
      "rules": {
        "no-restricted-imports": ["error", {
          "patterns": ["@libs/database*"]
        }]
      }
    },
    {
      "files": ["libs/entities/**/*.ts"],
      "rules": {
        "no-restricted-imports": ["error", {
          "patterns": ["@libs/entities*"]
        }]
      }
    },
    {
      "files": ["libs/services/**/*.ts"],
      "rules": {
        "no-restricted-imports": ["error", {
          "patterns": ["@libs/services*"]
        }]
      }
    }
  ]
};
