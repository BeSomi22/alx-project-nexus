import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
];

export default eslintConfig;

// import { dirname } from "path";
// import { fileURLToPath } from "url";
// import { FlatCompat } from "@eslint/eslintrc";

// const filename = fileURLToPath(import.meta.url);
// const dirname = dirname(filename);

// const compat = new FlatCompat({
//   baseDirectory: dirname,
// });

// const eslintConfig = [
//   ...compat.extends("next/core-web-vitals", "next/typescript"),

//   // Add your custom rules here
//   {
//     rules: {
//       '@typescript-eslint/no-explicit-any': 'warn',
//     },
//   },
// ];

// export default eslintConfig;
