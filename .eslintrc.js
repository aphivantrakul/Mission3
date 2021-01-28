module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaVersion": 12
    },
    "plugins": [
        "@typescript-eslint"
    ],
    "rules": {
        "eqeqeq": ["error", "always"],
        "no-var": "error",
        "semi": ["error", "always"],
        "quotes": ["error", "double"]
    }
};
