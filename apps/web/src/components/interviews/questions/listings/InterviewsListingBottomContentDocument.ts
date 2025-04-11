import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseLocale(sourceFilePath: string) {
  return path.basename(sourceFilePath).split('.')[0];
}

export const InterviewsListingBottomContentDocument = defineDocumentType(
  () => ({
    computedFields: {
      locale: {
        description: 'Locale',
        resolve: (doc) => parseLocale(doc._raw.sourceFileName),
        type: 'string',
      },
      slug: {
        description: 'Unique identifier of the company',
        resolve: (doc) =>
          path.relative(
            'interviews/listing-bottom-content/',
            doc._raw.sourceFileDir,
          ),
        type: 'string',
      },
    },
    contentType: 'mdx',
    filePathPattern: 'interviews/listing-bottom-content/**/*.mdx',
    name: 'InterviewsListingBottomContent',
  }),
);
