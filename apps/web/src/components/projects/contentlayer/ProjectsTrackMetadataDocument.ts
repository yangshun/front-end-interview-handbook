import { defineDocumentType } from 'contentlayer2/source-files';
import path from 'node:path';

function parseTrackSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.posix.sep)[2];
}

export const ProjectsTrackMetadataDocument = defineDocumentType(() => ({
  computedFields: {
    href: {
      description: 'Link to project track page',
      resolve: (doc) =>
        `/projects/tracks/${parseTrackSlug(doc._raw.sourceFilePath)}`,
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
    order: {
      description: 'Order to be displayed on track list page',
      required: true,
      type: 'number',
    },
    premium: {
      description: 'Whether the track is premium',
      required: true,
      type: 'boolean',
    },
  },
  filePathPattern: 'projects/tracks/*/metadata.json',
  name: 'ProjectsTrackMetadata',
}));
