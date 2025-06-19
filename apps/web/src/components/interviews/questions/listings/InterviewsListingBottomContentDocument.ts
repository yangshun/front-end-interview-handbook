import { defineDocumentType } from 'contentlayer/source-files';

function parseSlug(sourceFileName: string) {
  return sourceFileName.replace(/\.mdx$/, '');
}

export const InterviewsListingBottomContentDocument = defineDocumentType(
  () => ({
    computedFields: {
      slug: {
        description: 'Unique identifier of the company',
        resolve: (doc) => parseSlug(doc._raw.sourceFileName),
        type: 'string',
      },
    },
    contentType: 'mdx',
    filePathPattern: 'interviews/listing-bottom-content/**/*.mdx',
    name: 'InterviewsListingBottomContent',
  }),
);
