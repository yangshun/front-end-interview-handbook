import { defineDocumentType } from 'contentlayer2/source-files';

export const BlogAuthorDocument = defineDocumentType(() => ({
  bodyType: 'none',
  computedFields: {
    source: {
      resolve: (doc) => doc._raw.sourceFilePath,
      type: 'string',
    },
  },
  fields: {
    avatarUrl: { required: true, type: 'string' },
    handle: { required: true, type: 'string' },
    name: { required: true, type: 'string' },
    title: { required: true, type: 'string' },
  },
  filePathPattern: `blog/author/*.json`,
  name: 'BlogAuthor',
}));
