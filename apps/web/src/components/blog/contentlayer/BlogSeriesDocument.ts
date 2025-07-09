import { defineDocumentType } from 'contentlayer2/source-files';

import { BlogCategoryDocument } from './BlogCategoryDocument';

export const BlogSeriesDocument = defineDocumentType(() => ({
  bodyType: 'none',
  computedFields: {
    href: {
      resolve: (series) =>
        `/blog/series/${series._raw.flattenedPath.split('/')[2]}`,
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
    category: {
      embedDocument: true,
      of: BlogCategoryDocument,
      type: 'reference',
    },
    description: { embedDocument: true, required: true, type: 'string' },
    level: { required: true, type: 'string' },
    ranking: { default: 999, required: false, type: 'number' },
    tags: { of: { type: 'string' }, required: true, type: 'list' },
    title: { required: true, type: 'string' },
  },
  filePathPattern: `blog/series/*.json`,
  name: 'BlogSeries',
}));
