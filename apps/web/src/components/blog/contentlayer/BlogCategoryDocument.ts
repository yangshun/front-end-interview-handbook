import { defineDocumentType } from 'contentlayer2/source-files';

export const BlogCategoryDocument = defineDocumentType(() => ({
  bodyType: 'none',
  computedFields: {
    href: {
      resolve: (series) => `/blog/${series._raw.flattenedPath.split('/')[2]}`,
      type: 'string',
    },
    slug: {
      resolve: (doc) => doc._raw.flattenedPath.split('/')[2],
      type: 'string',
    },
    source: {
      resolve: (doc) => doc._raw.sourceFilePath,
      type: 'string',
    },
  },
  fields: {
    ranking: { default: 999, required: false, type: 'number' },
    title: { required: true, type: 'string' },
  },
  filePathPattern: `blog/category/*.json`,
  name: 'BlogCategory',
}));
