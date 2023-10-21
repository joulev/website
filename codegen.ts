import type { CodegenConfig } from "@graphql-codegen/cli";

const config: CodegenConfig = {
  overwrite: true,
  schema: "https://graphql.anilist.co",
  documents: "**/*.ts",
  generates: {
    "src/lib/gql/": {
      preset: "client",
      plugins: [],
    },
  },
};

export default config;
