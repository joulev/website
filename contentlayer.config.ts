import { defineDocumentType, makeSource } from "contentlayer/source-files";

export const BlogPost = defineDocumentType(() => ({
  name: "BlogPost",
  filePathPattern: `**/*.md`,
  fields: { title: { type: "string", required: true } },
  computedFields: {
    url: { type: "string", resolve: post => `/blog/${post._raw.flattenedPath}` },
  },
}));

export default makeSource({ contentDirPath: "contents/blogs", documentTypes: [BlogPost] });
