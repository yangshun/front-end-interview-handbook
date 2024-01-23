import { defineDocumentType } from 'contentlayer/source-files';
import path from 'node:path';

function parseTrackSlug(sourceFilePath: string) {
  return sourceFilePath.split(path.sep)[2];
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
      description: 'Unique identifier of the project',
      resolve: (doc) => parseTrackSlug(doc._raw.sourceFilePath),
      type: 'string',
    },
  },
  contentType: 'data',
  fields: {
    description: {
      description: 'Short description of the project',
      required: true,
      type: 'string',
    },
    premium: {
      description: 'Whether the track is premium',
      required: true,
      type: 'boolean',
    },
    title: {
      description: 'Name of the track',
      required: true,
      type: 'string',
    },
  },
  filePathPattern: 'projects/tracks/*/*.json',
  name: 'ProjectsTrackMetadata',
}));
