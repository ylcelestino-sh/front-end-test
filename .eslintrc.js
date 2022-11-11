module.exports = {
    "env": {
        "node": true,
        "commonjs": true,
        "browser": true,
        "es2021": true,
        "jest": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
    ],
    "overrides": [
    ],
    "parserOptions": {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "settings": {
        "react": {
          "version": 'detect'
        },
    },
    "plugins": [
        "react"
    ],
    "rules": {
    }
}
