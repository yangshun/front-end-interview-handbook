import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

function parseChallengeSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

export const ProjectsChallengeInfoDocument = defineDocumentType(() => ({
  computedFields: {
    locale: {
      description: 'Locale of document',
      resolve: (doc) =>
        doc._raw.sourceFileName.replace(
          path.extname(doc._raw.sourceFileName),
          '',
        ),
      type: 'string',
    },
    slug: {
      description: 'Unique identifier of the skill',
      resolve: (doc) => parseChallengeSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'data',
  fields: {
    description: {
      description: 'Description of the challenge',
      required: true,
      type: 'string',
    },
    specLabels: {
      description: 'Labels for spec pages. Should tally with specImages field',
      required: true,
      type: 'json',
    },
    title: {
      description: 'Name of the challenge',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'projects/challenges/*/info/*.json',
  name: 'ProjectsChallengeInfo',
}));
