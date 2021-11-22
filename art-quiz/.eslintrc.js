module.exports = {
    root: true,
    env: {
        browser: true,
        es2021: true
    },
    extends: ['airbnb-base'],
    parserOptions: {
        ecmaVersion: 12,
        sourceType: 'module'
    },
    rules: {
        'no-console': 'error',
        'import/extensions': 'off',
        'import/no-cycle': 'off',
        'no-param-reassign': 'off',
        'no-plusplus': 'off',
        'no-shadow': 'off',
        // formatting is forced by prettier
        'linebreak-style': 'off',
        'implicit-arrow-linebreak': 'off',
        'function-paren-newline': 'off',
        'lines-between-class-members': 'off',
        'object-curly-newline': 'off',
        'max-len': 'off',
        indent: 'off',
        'comma-dangle': 'off',
    }
};
