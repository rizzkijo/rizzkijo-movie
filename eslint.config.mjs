import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
// import js from "@eslint/js";
// import tseslint from "typescript-eslint";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  // Base Next.js rules (compat dari config lama)
  ...compat.extends("next/core-web-vitals", "next/typescript"),
  // Tambah rekomendasi TS plugin (pakai paket yang sudah kamu install)
  ...compat.extends("plugin:@typescript-eslint/recommended"),
  
  // Tambahan: batasi file & ignore build artifacts
  {
    files: ["src/**/*.{ts,tsx,js,jsx}"],   // <— lint hanya source
    ignores: [
      "**/*.min.js",
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      "dist/**",
      "coverage/**",
      "public/**",
      ".husky/**",
    ],
    rules: {
      "no-console": ["error", { allow: ["warn", "error"] }],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        { allowShortCircuit: true, allowTernary: true, allowTaggedTemplates: true }
      ],
      "@typescript-eslint/no-unused-vars": [
        "error",
        { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }
      ],
    },
  },

  // Opsional: juga lint file config dan scripts JS/TS di root
  {
    files: ["*.{js,mjs,cjs,ts}", "scripts/**/*.{js,ts}"],
    ignores: ["node_modules/**"],
  },
];

export default eslintConfig;
