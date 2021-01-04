module.exports = {
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    tsconfigRootDir: __dirname,
  },
  plugins: ["@typescript-eslint", "react-hooks"],
  extends: [
    "airbnb-typescript",
    "plugin:@typescript-eslint/recommended",
  ],
  rules: {
    "@typescript-eslint/quotes": ["error", "double"],
    "@typescript-eslint/ban-types": "off",
    "react/react-in-jsx-scope": "off",
    "arrow-body-style": "off",
    "react/destructuring-assignment": "off",
    "no-plusplus": "off",
    "import/extensions": "off",
    "max-len": ["error", { code: 150 }],
    "react/jsx-props-no-spreading": "off",
    "react-hooks/rules-of-hooks": "error", // Проверяем правила хуков
    "react-hooks/exhaustive-deps": "warn", // Проверяем зависимости эффекта
    "no-param-reassign": ["error", { props: false }],
  },
};
