import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  documents: ["src/**/*.ts", "!src/lib/gql/**"],
  generates: {
    "src/lib/gql/": {
      preset: "client",
    },
    "src/lib/gql/types.ts": {
      plugins: ["typescript"],
    },
  },
};

export default config;
