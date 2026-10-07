import {defineConfig,globalIgnores} from "eslint/config";
import tseslint from "typescript-eslint";
import nextPlugin from "@next/eslint-plugin-next";

export default defineConfig([
  ...tseslint.configs.recommended,
  {
    files:["**/*.{js,jsx,ts,tsx}"],
    plugins:{"@next/next":nextPlugin},
    rules:{...nextPlugin.configs.recommended.rules}
  },
  {
    files:["**/*.{ts,tsx}"],
    languageOptions:{parserOptions:{projectService:true,ecmaFeatures:{jsx:true}}}
  },
  globalIgnores([".next/**","out/**","build/**","next-env.d.ts"])
]);
