import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

function parseChallengeSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

export const ProjectsChallengeGuideDocument = defineDocumentType(() => ({
  computedFields: {
    challenge: {
      description: 'Unique identifier of the challenge',
      resolve: (doc) => parseChallengeSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
    locale: {
      description: 'Locale of document',
      resolve: (doc) =>
        doc._raw.sourceFileName.replace(
          path.extname(doc._raw.sourceFileName),
          '',
        ),
      type: 'string',
    },
  },
  contentType: 'mdx',
  filePathPattern: 'projects/challenges/*/guide/*.mdx',
  name: 'ProjectsChallengeGuide',
}));
