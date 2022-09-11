module.exports = {
  parserOptions: {
    sourceType: 'module' // turns on strict mode
  },
  env: {
    es6: true
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended'
  ],
  plugins: ['vuetify'],
  globals: {
    globalThis: false
  },
  rules: {
    'array-callback-return': 'error',
    'arrow-body-style': ['error', 'as-needed'],
    'arrow-parens': ['error', 'as-needed'],
    'consistent-return': 'error',
    // curly: 'error',
    // curly: ['error', 'multi-line', 'consistent'],
    // curly: ['error', 'multi', 'consistent'],
    'default-case': 'error',
    eqeqeq: 'error',
    'guard-for-in': 'error',
    'max-classes-per-file': ['error', 1],
    'no-alert': 'error',
    'no-caller': 'error',
    'no-console': 'error',
    'no-duplicate-imports': 'error',
    'no-else-return': ['error', { allowElseIf: false }],
    'no-empty-function': ['error', { allow: ['arrowFunctions'] }],
    'no-eval': 'error',
    'no-extend-native': 'error',
    'no-extra-bind': 'error',
    'no-extra-parens': 'off', // Conflicts with Prettier
    'no-floating-decimal': 'error',
    'no-implicit-coercion': ['error', { allow: ['!!'] }],
    'no-invalid-this': 'error',
    'no-implied-eval': 'error',
    'no-label-var': 'error',
    'no-labels': 'error',
    'no-lone-blocks': 'error',
    'no-nested-ternary': 'error',
    'no-new': 'error',
    'no-new-func': 'error',
    'no-new-wrappers': 'error',
    'no-param-reassign': 'error',
    'no-proto': 'error',
    'no-prototype-builtins': 'off',
    'no-return-assign': 'error',
    'no-return-await': 'error',
    'no-self-compare': 'error',
    'no-sequences': 'error',
    'no-shadow': 'error',
    'no-throw-literal': 'error',
    'no-trailing-spaces': 'error',
    'no-undef-init': 'error',
    'no-unmodified-loop-condition': 'error',
    'no-unneeded-ternary': 'error',
    'no-unused-expressions': 'error',
    // 'no-use-before-define': ['error', 'nofunc'], // Lots of errors because of private functions / variables
    'no-useless-call': 'error',
    'no-useless-computed-key': 'error',
    'no-useless-constructor': 'error',
    'no-useless-rename': 'error',
    'no-useless-return': 'error',
    'no-var': 'error',
    'object-shorthand': ['error', 'always', { avoidQuotes: true }],
    'one-var': ['error', 'never'],
    'prefer-arrow-callback': 'error',
    'prefer-const': ['error', { destructuring: 'all' }],
    'prefer-destructuring': [
      'error',
      {
        VariableDeclarator: { object: true, array: true },
        AssignmentExpression: { object: false, array: false }
      }
    ],
    'prefer-numeric-literals': 'error',
    'prefer-rest-params': 'error',
    'prefer-spread': 'error',
    'prefer-template': 'error',
    'require-await': 'error',
    'sort-imports': 'off',
    // -----------------------------------------------------------------------
    // Prettier Rules
    // -----------------------------------------------------------------------
    'prettier/prettier': [
      'error',
      {
        printWidth: 80,
        tabWidth: 2,
        singleQuote: true,
        semi: false,
        arrowParens: 'avoid',
        trailingComma: 'none'
      }
    ],
    // 'max-len': ['error', { code: 120, tabWidth: 2 }],
    // -----------------------------------------------------------------------
    // Vue Rules
    // -----------------------------------------------------------------------
    'vue/no-unused-vars': 'error',
    'vue/v-bind-style': 'error',
    'vue/v-on-style': 'error',

    'vue/attribute-hyphenation': 'off',
    'vue/attributes-order': 'off',
    'vue/html-closing-bracket-newline': 'off',
    'vue/html-indent': 'off',
    'vue/html-self-closing': 'off',
    'vue/max-attributes-per-line': 'off',
    'vue/multi-word-component-names': [
      'error',
      {
        // @TODO: Rename these components to comply with the rule
        // WARNING: Don't add new components to this list. These are here for backwards compatibility.
        ignores: [
          'Alert',
          'Asset',
          'Autocomplete',
          'Breadcrumb',
          'Card',
          'Chart',
          'Checkbox',
          'Chip',
          'Combobox',
          'Dashboard',
          'Date',
          'Default',
          'Detail',
          'Draggable',
          'Duration',
          'Error',
          'Footer',
          'Form',
          'Grid',
          'Header',
          'Icon',
          'Iterator',
          'Link',
          'List',
          'Literal',
          'Login',
          'Menu',
          'Modal',
          'Overlay',
          'Search',
          'Snackbar',
          'Stepper',
          'Tabs',
          'Template',
          'Timeline'
        ]
      }
    ],
    'vue/multiline-html-element-content-newline': 'off',
    'vue/name-property-casing': 'off',
    'vue/no-v-html': 'off',
    'vue/order-in-components': 'off',
    'vue/require-default-prop': 'off',
    'vue/require-prop-types': 'off',
    'vue/singleline-html-element-content-newline': 'off',
    'vue/this-in-template': 'off',
    'vue/valid-v-slot': ['error', { allowModifiers: true }],
    //----------------------------------------------------------
    // Vuetify plugin
    //----------------------------------------------------------
    'vuetify/grid-unknown-attributes': 'error',
    'vuetify/no-legacy-grid': 'error',
    'vuetify/no-deprecated-classes': 'error'
  },
  overrides: [
    // Test files
    {
      files: ['**/__tests__/*.test.js'],
      env: {
        jest: true,
        node: true
      }
    },
    // Node Scripts
    {
      files: [
        '.eslintrc.js',
        'babel.config.js',
        'jest.config.js',
        'jest-full-coverage.config.js',
        'vue.config.js',
        'generator/*',
        'scripts/*',
        'tests/**/*.js' // Cypress tests
      ],
      env: {
        node: true
      }
    }
  ]
}
