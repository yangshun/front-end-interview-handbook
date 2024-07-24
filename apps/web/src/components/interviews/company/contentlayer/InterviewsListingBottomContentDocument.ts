import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2].replace(/\.mdx$/, '');
}

export const InterviewsListingBottomContentDocument = defineDocumentType(
  () => ({
    computedFields: {
      slug: {
        description: 'Unique identifier of the company',
        resolve: (doc) => parseSlug(doc._raw.sourceFilePath),
        type: 'string',
      },
    },
    contentType: 'mdx',
    filePathPattern: 'interviews/listing-bottom-content/*.mdx',
    name: 'InterviewsListingBottomContent',
  }),
);
