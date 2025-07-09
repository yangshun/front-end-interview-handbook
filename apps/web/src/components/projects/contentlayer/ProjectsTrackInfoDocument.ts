import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

function parseTrackSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

export const ProjectsTrackInfoDocument = defineDocumentType(() => ({
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
      description: 'Unique identifier of the track',
      resolve: (doc) => parseTrackSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'data',
  fields: {
    description: {
      description: 'Description of the track',
      required: true,
      type: 'string',
    },
    title: {
      description: 'Name of the track',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'projects/tracks/*/info/*.json',
  name: 'ProjectsTrackInfo',
}));
