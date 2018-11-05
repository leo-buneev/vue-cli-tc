module.exports = {
  root: true,
  env: {
    node: true,
  },
  globals: {
    _: true,
  },
  extends: ['plugin:vue/essential', 'plugin:tyrecheck/recommended', '@vue/prettier'],
  rules: {
    'vue/require-prop-types': 0,
    'vue/require-prop-type-constructor': 0,
    'vue/require-default-prop': 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'no-console': [process.env.NODE_ENV === 'production' ? 'error' : 'off', { allow: ['warn', 'error'] }],
  },
  parserOptions: {
    parser: 'babel-eslint',
  },
}
