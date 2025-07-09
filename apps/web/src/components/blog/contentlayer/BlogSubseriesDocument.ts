import { defineDocumentType } from 'contentlayer2/source-files';

import { BlogSeriesDocument } from './BlogSeriesDocument';

export const BlogSubseriesDocument = defineDocumentType(() => ({
  bodyType: 'none',
  computedFields: {
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
    description: { required: true, type: 'string' },
    series: { of: BlogSeriesDocument, required: true, type: 'reference' },
    title: { required: true, type: 'string' },
  },
  filePathPattern: `blog/subseries/*.json`,
  name: 'BlogSubseries',
}));
