import {
  defineDocumentType,
  defineNestedType,
} from 'contentlayer2/source-files';
import readingTime from 'reading-time';

import { BlogAuthorDocument } from './BlogAuthorDocument';
import { BlogCategoryDocument } from './BlogCategoryDocument';
import { BlogSeriesDocument } from './BlogSeriesDocument';
import { BlogSubseriesDocument } from './BlogSubseriesDocument';

const RelatedPost = defineNestedType(() => ({
  fields: {
    slug: { required: true, type: 'string' },
  },
  name: 'RelatedPost',
}));

export const BlogPostDocument = defineDocumentType(() => ({
  computedFields: {
    href: {
      resolve: (doc) => `/${doc._raw.flattenedPath.replace(`/posts`, '')}`,
      type: 'string',
    },
    readingTime: {
      resolve: (doc) => Math.ceil(readingTime(doc.body.raw).minutes),
      type: 'number',
    },
    slug: {
      resolve: (doc) => doc._raw.flattenedPath.split('/')[2],
      type: 'string',
    },
  },
  contentType: 'mdx',
  fields: {
    author: {
      embedDocument: true,
      of: BlogAuthorDocument,
      required: true,
      type: 'reference',
    },
    category: {
      embedDocument: true,
      of: BlogCategoryDocument,
      type: 'reference',
    },
    createdAt: { required: true, type: 'date' },
    description: { required: true, type: 'string' },
    imageUrl: { required: false, type: 'string' },
    level: { required: true, type: 'string' },
    published: { required: true, type: 'boolean' },
    relatedPosts: {
      of: RelatedPost,
      required: false,
      type: 'list',
    },
    series: { of: BlogSeriesDocument, type: 'reference' },
    subseries: { of: BlogSubseriesDocument, type: 'reference' },
    tags: { of: { type: 'string' }, required: true, type: 'list' },
    title: { required: true, type: 'string' },
  },
  filePathPattern: `blog/posts/*.mdx`,
  name: 'BlogPost',
}));
