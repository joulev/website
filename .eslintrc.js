const { resolve } = require("node:path");

const project = resolve(__dirname, "tsconfig.json");

module.exports = {
  root: true,
  extends: [
    require.resolve("@vercel/style-guide/eslint/browser"),
    require.resolve("@vercel/style-guide/eslint/react"),
    require.resolve("@vercel/style-guide/eslint/next"),
    require.resolve("@vercel/style-guide/eslint/node"),
    require.resolve("@vercel/style-guide/eslint/typescript"),
  ],
  parserOptions: { project },
  settings: { "import/resolver": { typescript: { project } } },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-confusing-void-expression": "off",
    "@typescript-eslint/no-misused-promises": "off",
    "@typescript-eslint/no-unnecessary-condition": ["error", { allowConstantLoopConditions: true }],
    "import/no-extraneous-dependencies": "off",
    "import/order": "off",
    "import/no-default-export": "off",
    "no-console": "off",
    "no-constant-condition": ["error", { checkLoops: false }],
    "no-nested-ternary": "off",
    "react/jsx-sort-props": "off",
    "react/no-array-index-key": "off",
  },
  ignorePatterns: ["src/lib/gql"],
};
